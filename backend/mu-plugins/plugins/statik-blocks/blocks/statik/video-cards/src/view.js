import apiFetch from '@wordpress/api-fetch';
import { MicroModal, rwdAttribute } from '@statik-space/wp-statik-utils';

export default function ( { attributes } ) {
	document.addEventListener( 'DOMContentLoaded', async () => {
		const instance = new VideoCards(
			document.querySelector( `.wp-block-${ attributes.blockId }` ),
			attributes
		);
		await instance.init();
	} );
}

class VideoCards {
	constructor( element, attributes ) {
		this.element = element;
		this.attributes = attributes;
		this.modalContainerElement = null;
		this.posts = null;
		this.videos = null;
	}

	async init() {
		await this.prepareData();
		await this.renderPosts();
	}

	async prepareData() {
		if ( ! this.posts ) {
			this.posts = await this.fetchPosts();
		}

		if ( ! this.videos ) {
			this.videos = await this.fetchVideos( this.posts );

			this.posts.forEach( ( post ) => {
				const { video_source, local_file } = post.acf;
				if ( video_source === 'local' ) {
					const video = this.videos.find(
						( v ) => v.id === local_file
					);
					post.acf.video_url = video?.guid?.rendered ?? null;
				}
			} );
		}
	}

	async fetchPosts() {
		let posts = [];
		const queryString = new URLSearchParams(
			this.attributes.query
		).toString();

		try {
			posts = await apiFetch( {
				path: `/wp/v2/videos?_embed&${ queryString }`,
			} );
		} catch ( error ) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
		}
		return posts;
	}

	async fetchVideos( posts ) {
		let videos = [];
		const videosIds = await this.getVideosIds( posts );
		const videosIdsString = videosIds.join( ',' );

		try {
			videos = await apiFetch( {
				path: `/wp/v2/media?_embed&include=${ videosIdsString }`,
			} );
		} catch ( error ) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
		}
		return videos;
	}

	async getVideosIds( posts ) {
		const videosIds = [];

		posts.forEach( ( post ) => {
			const { video_source, local_file } = post.acf;

			if ( video_source === 'local' ) {
				videosIds.push( local_file );
			}
		} );

		return videosIds;
	}

	getPostTagName() {
		const postTagName =
			this.attributes.followUpArea === 'area' ? 'a' : 'div';

		return postTagName;
	}

	async renderPosts() {
		const postsHtml = await Promise.all(
			this.posts.map( async ( post ) => {
				return await this.getVideoCardHtml( post );
			} )
		);

		const style = this.getStyle();

		const videoCardsFragment = document.createDocumentFragment();

		postsHtml.forEach( ( item, index ) => {
			const post = this.posts[ index ];
			videoCardsFragment.appendChild( item );
			this.registerEffects( item, post );
		} );

		this.element.appendChild( videoCardsFragment );
		this.element.appendChild( style );
	}

	async getVideoCardHtml( post ) {
		const postTagName = this.getPostTagName();
		const hrefUrl = this.getUrlHref( post );
		const { followUpArea, followUpBehaviour } = this.attributes;
		const videoCard = document.createElement( postTagName );
		videoCard.setAttribute( 'class', `wp-block-statik-video-cards__card` );
		if ( followUpArea === 'area' && followUpBehaviour === 'redirect' ) {
			videoCard.setAttribute( 'href', hrefUrl );
		}

		videoCard.innerHTML = `
			${ this.getPostImageHtml( post ) }		
			${ this.getPostCategoriesHtml( post ) }
			${ this.getPostDateHtml( post ) }
			${ this.getPostTitleHtml( post ) }
			${ this.getPostExcerptHtml( post ) }
			${ this.getPostTagsHtml( post ) }
			${ this.getReadMoreButtonHtml( post ) }
			${ this.getPlayButtonHtml() }
		`;

		return videoCard;
	}

	getPostTitleHtml( post ) {
		if ( ! this.attributes.displayTitle ) return '';
		return `<h3>${ post.title.rendered }</h3>`;
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
		if ( ! this.attributes.displayFeaturedImage ) return '';

		const featuredMedia = post?._embedded?.[ 'wp:featuredmedia' ];

		if ( ! featuredMedia ) {
			return `
				<div class="wp-block-statik-video-cards__image--empty"></div>
			`;
		}

		const { source_url, title, media_details } = featuredMedia[ 0 ];
		const srcset = this.getSrcsetAttribute( media_details.sizes );

		return `
			<div class="wp-block-statik-video-cards__image">
				<img srcset="${ srcset }" 
					 src="${ source_url }" 
					 alt="${ title.rendered }"
				/>
			</div>
		`;
	}

	getTaxonomyTerms( post, taxonomyName ) {
		const taxonomyIds = post[ taxonomyName ] ?? [];
		const mergedTerms = post._embedded?.[ 'wp:term' ]?.flat() ?? [];

		const terms = mergedTerms
			.filter( ( term ) => taxonomyIds.includes( term.id ) )
			.map( ( term ) => term.name );

		return terms;
	}

	getPostCategoriesHtml( post ) {
		if ( ! this.attributes.displayCategories ) return '';

		const postCategories = this.getTaxonomyTerms( post, 'videos_category' );

		return `
		<ul class="wp-block-statik-video-cards__categories">
			${ postCategories.map( ( category ) => `<li>${ category }</li>` ).join( '' ) }
		</ul>
		`;
	}

	getPostTagsHtml( post ) {
		if ( ! this.attributes.displayTags ) return '';

		const postTags = this.getTaxonomyTerms( post, 'videos_tag' );

		return `
		  <ul class="wp-block-statik-video-cards__tags">
			${ postTags.map( ( tag ) => `<li>${ tag }</li>` ).join( '' ) }
		  </ul>
		`;
	}

	getPostExcerptHtml( post ) {
		if ( ! this.attributes.displayExcerpt ) return '';

		return `
		<div
		class="wp-block-statik-video-cards__excerpt">
			${ post.excerpt.rendered }
		</div>
		`;
	}

	getDayYYYYMMDD( dateToConvert ) {
		const date = new Date( dateToConvert );
		const dateString = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		)
			.toISOString()
			.split( 'T' )[ 0 ];

		return dateString;
	}

	getPostDateHtml( post ) {
		if ( ! this.attributes.displayLastUpdatedDate ) return '';

		const dateString = this.getDayYYYYMMDD( post.modified_gmt );

		return `
		<time class="wp-block-statik-video-cards__updated" datetime=${ dateString }>
			${ dateString }
		</time>
		`;
	}

	convertCamelToSnake( camelString ) {
		return camelString.replace( /[A-Z]/g, ( letter, index ) => {
			const separator = index === 0 ? '' : '_';
			return separator + letter.toLowerCase();
		} );
	}

	getObjectPropertyByPath( object, path ) {
		const keys = path
			.split( '.' )
			.map( ( prop ) => this.convertCamelToSnake( prop ) );
		let propertyValue = object;
		for ( const key of keys ) {
			if ( propertyValue.hasOwnProperty( key ) ) {
				propertyValue = propertyValue[ key ];
			} else {
				propertyValue = undefined;
				console.error(
					`The provided path '${ path }' cannot be resolved`
				);
				break;
			}
		}
		return propertyValue;
	}

	getUrlHref( post ) {
		const { destination } = this.attributes;
		if ( destination === 'default' ) {
			return post.link;
		}

		const propertyPath = destination;
		const urlHref = this.getObjectPropertyByPath( post, propertyPath );
		return urlHref;
	}

	getReadMoreButtonHtml( post ) {
		if ( ! this.attributes.displayReadMoreButton ) return '';

		const { followUpArea } = this.attributes;

		if ( followUpArea === 'none' || followUpArea === 'area' ) {
			return ` 
				<div class="wp-block-statik-video-cards__read-more" >
					Read More
				</div>
			`;
		}

		const urlHref = this.getUrlHref( post );
		return `
			<a class="wp-block-statik-video-cards__read-more" href="${ urlHref }">
				Read More
			</a>
		`;
	}

	getPlayButtonHtml() {
		if ( ! this.attributes.displayPlayButton ) return '';

		return `
		<button class="wp-block-statik-video-cards__play-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 32 32"
			>
				<path
				fill="fill"
				d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 29C8.82 29 3 23.18 3 16S8.82 3 16 	3s13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z"
			/>
			</svg>
		</button>
		`;
	}

	// modal
	registerEffects( item, post ) {
		const { followUpBehaviour, followUpArea } = this.attributes;

		if ( followUpBehaviour === 'redirect' ) return null;

		let element = null;

		if ( followUpArea === 'area' && followUpBehaviour === 'modal' ) {
			element = item;
		}

		if ( followUpArea === 'button' && followUpBehaviour === 'modal' ) {
			element = item.querySelector(
				'.wp-block-statik-video-cards__read-more'
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
		MicroModal.show( `modal-video-card-${ post.id }`, modalConfig );
	}

	destroyModal() {
		if ( ! this.modalContainerElement ) {
			return;
		}
		this.modalContainerElement.remove();
		this.modalContainerElement = null;
	}

	getExternalVideoModalHtml( videoUrl ) {
		return `
		<iframe width="560" height="315" src="${ videoUrl }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		`;
	}

	getInternalVideoModalHtml( videoUrl ) {
		return `
		<video width="560" height="315" controls>
		<source src="${ videoUrl }" type="video/mp4">
		Your browser does not support the video tag.
	 	 </video>`;
	}

	async getModalHtml( post ) {
		const { video_source, video_url } = post.acf;
		let videoHtml = null;

		if ( video_source === 'external' ) {
			videoHtml = this.getExternalVideoModalHtml( video_url );
		}

		if ( video_source === 'local' ) {
			videoHtml = this.getInternalVideoModalHtml( video_url );
		}

		return `
		<div id="modal-video-card-${ post.id }" class="modal micromodal-slide" aria-hidden="true">
			<div class="modal__overlay">
				<div class="modal__content"> 
					<button class="modal__close" aria-label="Close modal" data-micromodal-close></button> 
				 ${ videoHtml }
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
		  --wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.mobile };
		}
		@media (min-width: 991px) {
		  .wp-block-${ this.attributes.blockId } {
			--wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.tablet };
		  }
		}
		@media (min-width: 1200px) {
		  .wp-block-${ this.attributes.blockId } {
			--wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.desktop };
		  }
		}
		`;

		return style;
	}
}
