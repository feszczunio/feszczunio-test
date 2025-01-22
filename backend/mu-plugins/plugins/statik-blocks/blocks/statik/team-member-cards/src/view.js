import apiFetch from '@wordpress/api-fetch';
import { MicroModal, rwdAttribute } from '@statik-space/wp-statik-utils';
import rot13 from 'rot-13';
import {
	getLinkedInIcon,
	getMailIcon,
	getTwitterIcon,
	getWebsiteIcon,
} from './components/icons/icons.js';

export default function ( { attributes, currentPostId } ) {
	document.addEventListener( 'DOMContentLoaded', async () => {
		const instance = new TeamMembersCards(
			document.querySelector( `.wp-block-${ attributes.blockId }` ),
			attributes,
			currentPostId
		);
		await instance.init();
	} );
}

class TeamMembersCards {
	constructor( element, attributes, currentPostId ) {
		this.element = element;
		this.attributes = attributes;
		this.modalContainerElement = null;
		this.posts = null;
		this.followUpArea = this.attributes.followUpArea;
		this.followUpBehaviour = this.attributes.followUpBehaviour;
		this.readMoreButton = null;
		this.currentPostId = currentPostId;
	}

	async init() {
		await this.renderPosts();
	}

	async fetchPosts() {
		let posts = [];

		const query = this.attributes.query;
		const excludeArray = query.exclude ? [].concat( query.exclude ) : [];

		if ( this.attributes.excludeCurrentPost ) {
			excludeArray.push( this.currentPostId );
		}

		const updatedQuery = {
			...query,
			exclude: excludeArray.length ? excludeArray : '',
		};

		const queryString = new URLSearchParams( updatedQuery ).toString();
		try {
			posts = await apiFetch( {
				path: `/wp/v2/people?_embed&${ queryString }`,
			} );
		} catch ( error ) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
		}
		return posts;
	}

	getPostTagName() {
		const postTagName = this.followUpArea === 'area' ? 'a' : 'div';

		return postTagName;
	}

	async renderPosts() {
		const fetchedPosts = await this.fetchPosts();

		const postsHtml = await Promise.all(
			fetchedPosts.map( async ( post ) => {
				return await this.getPostHtml( post );
			} )
		);

		const style = this.getStyle();

		const personCardsFragment = document.createDocumentFragment();

		postsHtml.forEach( ( item, index ) => {
			const post = fetchedPosts[ index ];
			personCardsFragment.appendChild( item );
			this.registerEffects( item, post );
		} );

		this.element.appendChild( personCardsFragment );
		this.element.appendChild( style );
	}

	async getPostHtml( post ) {
		const postTagName = this.getPostTagName();
		const personCard = document.createElement( postTagName );

		personCard.setAttribute(
			'class',
			`wp-block-statik-team-member-cards__card`
		);
		if (
			this.followUpArea === 'area' &&
			this.followUpBehaviour === 'redirect'
		) {
			personCard.setAttribute( 'href', post.link );
		}

		personCard.innerHTML = `
			${ this.getPostImageHtml( post ) }		
			${ this.getPersonNameHtml( post ) }
			${ this.getPostShortDescriptionHtml( post ) }
			${ this.getPostLongDescriptionHtml( post ) }
			${ this.getSocialMediaIconsHtml( post ) }
			${ this.getReadMoreButtonHtml( post ) }

		`;

		return personCard;
	}

	getPersonNameHtml( post ) {
		if ( ! this.attributes.displayName ) return '';
		return `<h3 class="wp-block-statik-team-member-cards__name">${ post.title.rendered }</h3>`;
	}

	getSrcsetAttribute( mediaSizes ) {
		const srcset = [];

		const mediaSizesEntries = Object.entries( mediaSizes );
		for ( const [ , size ] of mediaSizesEntries ) {
			srcset.push( `${ size.source_url } ${ size.width }w` );
		}

		return srcset.join( ', ' );
	}

	getPostImageHtml( post ) {
		if ( ! this.attributes.displayImage ) return '';

		const featuredMedia = post?._embedded?.[ 'wp:featuredmedia' ];

		if ( ! featuredMedia ) {
			return `
				<div class="wp-block-statik-team-member-cards__image--empty"></div>
			`;
		}

		const { source_url, title, media_details } = featuredMedia[ 0 ];
		const srcset = this.getSrcsetAttribute( media_details.sizes );

		return `
			<div class="wp-block-statik-team-member-cards__image">
				<img srcset="${ srcset }" 
					 src="${ source_url }" 
					 alt="${ title.rendered }"
				/>
			</div>
		`;
	}

	getPostShortDescriptionHtml( post ) {
		if ( ! this.attributes.displayShortDescription ) return '';
		return `
			<div class="wp-block-statik-team-member-cards__long-desc">
				${ post.acf.short_description }
			</div>
		`;
	}

	getPostLongDescriptionHtml( post ) {
		if ( ! this.attributes.displayLongDescription ) return '';
		return `
			<div class="wp-block-statik-team-member-cards__long-desc">
				${ post.acf.long_description }
			</div>
		`;
	}

	getSocialMediaIconsHtml( post ) {
		if ( ! this.attributes.displaySocialMedia ) return '';

		return `
		<ul class="wp-block-statik-team-member-cards__social-media">
		${ this.getMailLinkHtml( post ) }
		${ this.getLinkedinLinkHtml( post ) }
		${ this.getTwitterLinkHtml( post ) }
		${ this.getWebsiteLinkHtml( post ) }
		</ul>
		`;
	}

	getLinkedinLinkHtml( post ) {
		if ( post.acf.contact_details.linkedin.length === 0 ) return '';

		const linkedinIcon = getLinkedInIcon();

		return `
		<li class="wp-block-statik-team-member-cards__linkedin">
		<a href=${ post.acf.contact_details.linkedin } rel="noreferrer">${ linkedinIcon }</a>
	 	 </li>
		`;
	}

	getMailLinkHtml( post ) {
		if ( post.acf.contact_details.email.length === 0 ) return '';

		const mailIcon = getMailIcon();

		return `
		  <li class="wp-block-statik-team-member-cards__email">
			<a href="mailto:${ rot13(
				post.acf.contact_details.email
			) }" rel="noreferrer">${ mailIcon }</a>
		  </li>
		`;
	}

	getWebsiteLinkHtml( post ) {
		if ( post.acf.contact_details.website.length === 0 ) return '';

		const websiteIcon = getWebsiteIcon();

		return `
		  <li class="wp-block-statik-team-member-cards__website">
			<a href="${ post.acf.contact_details.website }" target="_blank" rel="noreferrer">${ websiteIcon }</a>
		  </li>
		`;
	}

	getTwitterLinkHtml( post ) {
		if ( post.acf.contact_details.twitter.length === 0 ) return '';

		const twitterIcon = getTwitterIcon();

		return `
		  <li class="wp-block-statik-team-member-cards__twitter">
			<a href="${ post.acf.contact_details.twitter }" target="_blank" rel="noreferrer">${ twitterIcon }</a>
		  </li>
		`;
	}

	getReadMoreButtonHtml( post ) {
		if ( ! this.attributes.displayReadMoreButton ) return '';

		if ( this.followUpArea === 'none' || this.followUpArea === 'area' ) {
			return `
				<div class="wp-block-statik-team-member-cards__read-more" >
					Read More
				</div>
			`;
		}

		return `
		<a class="wp-block-statik-team-member-cards__read-more" href="${ post.link }">
			Read More
		</a>
		`;
	}

	// modal
	registerEffects( item, post ) {
		if ( this.followUpBehaviour === 'redirect' ) return null;

		let element = null;

		if (
			this.followUpArea === 'area' &&
			this.followUpBehaviour === 'modal'
		) {
			element = item;
		}

		if (
			this.followUpArea === 'button' &&
			this.followUpBehaviour === 'modal'
		) {
			element = item.querySelector(
				'.wp-block-statik-team-member-cards__read-more'
			);
		}

		if ( element ) {
			element.addEventListener( 'click', async ( e ) => {
				e.preventDefault();
				await this.appendModal( post );
				this.openModal( post );
			} );
		}

		return element;
	}

	async appendModal( post ) {
		if ( this.modalContainerElement ) {
			return;
		}

		const modalHtml = await this.getModalHtml( post );

		const modalTemplate = document.createElement( 'template' );

		modalTemplate.innerHTML = modalHtml.trim();
		this.modalContainerElement = modalTemplate.content.firstChild;
		document.body.appendChild( this.modalContainerElement );
	}

	openModal( post ) {
		const modalConfig = this.getModalConfig();
		MicroModal.show( `modal-team-member-${ post.id }`, modalConfig );
	}

	destroyModal() {
		if ( ! this.modalContainerElement ) {
			return;
		}
		this.modalContainerElement.remove();
		this.modalContainerElement = null;
	}

	getWebsiteModalHtml( post ) {
		return `
		<div class="wp-block-statik-team-member-cards__content-modal">
			<iframe src="${ post.link }" />
		</div>
		`;
	}

	getContentModalHtml( post ) {
		return `
		<div class="wp-block-statik-team-member-cards__content-modal">
			${ post.content.rendered }
		</div>
		`;
	}

	async getModalHtml( post ) {
		const modalContentRule = this.attributes.modalContent;

		let modalContent = null;

		if ( modalContentRule === 'website' ) {
			modalContent = this.getWebsiteModalHtml( post );
		}

		if ( modalContentRule === 'content' ) {
			modalContent = this.getContentModalHtml( post );
		}

		return `
		<div id="modal-team-member-${ post.id }" class="modal micromodal-slide " aria-hidden="true">
			<div class="modal__overlay">
				<div class="modal__content wp-block-statik-team-member-cards__modal"> 
					<button class="modal__close" aria-label="Close modal" data-micromodal-close></button> 
					${ modalContent }
				</div>
			</div>
		</div>
		`;
	}

	getModalConfig() {
		return {
			disableScroll: true,
			awaitCloseAnimation: true,
			onClose: ( modal ) => {
				const self = this;
				modal.addEventListener(
					'animationend',
					function handler() {
						self.destroyModal();
						modal.removeEventListener(
							'animationend',
							handler,
							false
						);
					},
					false
				);
			},
		};
	}

	//styles button

	getStyle() {
		const cardsPerRowRwd = rwdAttribute( this.attributes.cardsPerRow );

		const style = document.createElement( 'style' );

		style.innerHTML = `
		.wp-block-${ this.attributes.blockId } {
			--wp-block-statik-team-member-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.mobile };
		}
		@media (min-width: 991px) {
		  .wp-block-${ this.attributes.blockId } {
			--wp-block-statik-team-member-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.tablet };
		  }
		}
		@media (min-width: 1200px) {
		  .wp-block-${ this.attributes.blockId } {
			--wp-block-statik-team-member-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.desktop };
		  }
		}
		`;

		return style;
	}
}
