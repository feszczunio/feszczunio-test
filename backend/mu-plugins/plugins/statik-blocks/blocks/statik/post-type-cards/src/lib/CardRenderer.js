import { CardViewModel } from './CardViewModel';

export class CardRenderer {
	/**
	 * @param {CardViewModel} post
	 */
	static render( post ) {
		const tpl = document.createElement( 'template' );
		tpl.innerHTML = this.renderCard( post );
		return tpl.content;
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderCard( post ) {
		if ( post.followUpArea === 'area' ) {
			return [
				`<a class="wp-block-statik-post-type-cards__card" href="${ post.link }">`,
				this.renderContentHtml( post ),
				`</a>`,
			].join( '' );
		} else if (
			post.followUpArea === 'none' ||
			post.followUpArea === 'button'
		) {
			return [
				`<div class="wp-block-statik-post-type-cards__card">`,
				this.renderContentHtml( post ),
				`</div>`,
			].join( '' );
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderContentHtml( post ) {
		return [
			this.renderImageHtml( post ),
			this.renderCategoriesHtml( post ),
			this.renderDateHtml( post ),
			this.renderTitleHtml( post ),
			this.renderExcerptHtml( post ),
			this.renderTagsHtml( post ),
			this.renderReadMoreButtonHtml( post ),
		].join( '' );
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderImageHtml( post ) {
		if ( post.displayFeaturedImage ) {
			if ( ! post.hasFeaturedImage ) {
				return `<div class="wp-block-statik-post-type-cards__image--empty"></div>`;
			}
			return [
				`<div class="wp-block-statik-post-type-cards__image">`,
				`<img srcset="${ post.imageSrcsetAttr }" src="${ post.imageSrcAttr }" alt="${ post.imageAltAttr }" />`,
				`</div>`,
			].join( '' );
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderCategoriesHtml( post ) {
		if ( post.displayCategories ) {
			return [
				`<ul class="wp-block-statik-post-type-cards__categories">`,
				post.categories
					.map( ( category ) => `<li>${ category.name }</li>` )
					.join( '' ),
				`</ul>`,
			].join( '' );
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderDateHtml( post ) {
		if ( post.displayDate ) {
			return [
				`<time class="wp-block-statik-post-type-cards__updated" datetime="${ post.dateTime }">`,
				post.dateTime,
				`</time>`,
			].join( '' );
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderTitleHtml( post ) {
		if ( post.displayTitle ) {
			return `<h3>${ post.title }</h3>`;
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderExcerptHtml( post ) {
		if ( post.displayExcerpt ) {
			return [
				`<div class="wp-block-statik-post-type-cards__excerpt">`,
				post.excerpt,
				`</div>`,
			].join( '' );
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderTagsHtml( post ) {
		if ( post.displayTags ) {
			return [
				`<ul class="wp-block-statik-post-type-cards__tags">`,
				post.tags.map( ( tag ) => `<li>${ tag.name }</li>` ).join( '' ),
				`</ul>`,
			].join( '' );
		}
	}

	/**
	 * @param {CardViewModel} post
	 */
	static renderReadMoreButtonHtml( post ) {
		if ( post.displayReadMoreButton ) {
			if (
				post.followUpArea === 'none' ||
				post.followUpArea === 'area'
			) {
				return [
					`<div class="wp-block-statik-post-type-cards__read-more" >`,
					'Read More',
					`</div>`,
				].join( '' );
			} else if ( post.followUpArea === 'button' ) {
				return [
					`<a class="wp-block-statik-post-type-cards__read-more" href="${ post.link }">`,
					'Read More',
					`</a>`,
				].join( '' );
			}
			throw new Error(
				`Unsupported 'followUpArea' value: ${ post.followUpArea }`
			);
		}
	}
}
