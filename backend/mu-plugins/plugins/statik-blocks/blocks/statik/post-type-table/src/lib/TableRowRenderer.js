import { TableRowViewModel } from './TableRowViewModel';

export class TableRowRenderer {
	/**
	 * @param {TableRowViewModel} post
	 */
	static render( post ) {
		const tpl = document.createElement( 'template' );
		tpl.innerHTML = this.renderRow( post );
		const element = tpl.content.firstElementChild;
		return element;
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderRow( post ) {
		const classNames = [ 'wp-block-statik-post-type-table__card' ];

		if ( post.followUpArea === 'area' ) {
			classNames.push(
				'wp-block-statik-post-type-table__row--clickable'
			);
		}

		return [
			`<tr class="${ classNames.join( ' ' ) }">`,
			this.renderContentHtml( post ),
			`</tr>`,
		].join( '' );
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderContentHtml( post ) {
		return [
			this.renderTitleHtml( post ),
			this.renderCategoriesHtml( post ),
			this.renderTagsHtml( post ),
			this.renderDateHtml( post ),
			this.renderReadMoreButtonHtml( post ),
		].join( '' );
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderTitleHtml( post ) {
		if ( post.displayTitle ) {
			return [
				'<td class="wp-block-statik-post-type-table__title">',
				`<h3>${ post.title }</h3>`,
				'</td>',
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderCategoriesHtml( post ) {
		if ( post.displayCategories ) {
			return [
				`<td class="wp-block-statik-post-type-table__categories">`,
				`<ul>`,
				post.categories
					.map( ( category ) => `<li>${ category.name }</li>` )
					.join( '' ),
				`</ul>`,
				`</td>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderTagsHtml( post ) {
		if ( post.displayTags ) {
			return [
				`<td class="wp-block-statik-post-type-table__tags">`,
				`<ul>`,
				post.tags.map( ( tag ) => `<li>${ tag.name }</li>` ).join( '' ),
				`</ul>`,
				`</td>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderDateHtml( post ) {
		if ( post.displayDate ) {
			return [
				`<td class="wp-block-statik-post-type-table__updated" >`,
				`<time datetime="${ post.dateTime }">`,
				post.dateTime,
				`</time>`,
				`</td>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderReadMoreButtonHtml( post ) {
		if ( post.displayReadMoreButton ) {
			if (
				post.followUpArea === 'none' ||
				post.followUpArea === 'area'
			) {
				return [
					`<td class="wp-block-statik-post-type-table__read-more">`,
					'Read More',
					`</td>`,
				].join( '' );
			} else if ( post.followUpArea === 'button' ) {
				return [
					`<td class="wp-block-statik-post-type-table__read-more">`,
					`<a href="${ post.link }">`,
					'Read More',
					`</a>`,
					`</td>`,
				].join( '' );
			}
			throw new Error(
				`Unsupported 'followUpArea' value: ${ post.followUpArea }`
			);
		}
	}
}
