import { TableRowViewModel } from './TableRowViewModel';

export class TableHeadRowRenderer {
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
		return [
			`<tr class="wp-block-statik-post-type-table__header-row">`,
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
				`<th class="wp-block-statik-post-type-table__title">`,
				'Title',
				`</th>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderCategoriesHtml( post ) {
		if ( post.displayCategories ) {
			return [
				`<th class="wp-block-statik-post-type-table__categories">`,
				'Categories',
				`</th>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderTagsHtml( post ) {
		if ( post.displayTags ) {
			return [
				`<th class="wp-block-statik-post-type-table__tags">`,
				'Tags',
				`</th>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderDateHtml( post ) {
		if ( post.displayDate ) {
			return [
				`<th class="wp-block-statik-post-type-table__updated">`,
				'Date',
				`</th>`,
			].join( '' );
		}
	}

	/**
	 * @param {TableRowViewModel} post
	 */
	static renderReadMoreButtonHtml( post ) {
		if ( post.displayReadMoreButton ) {
			return [
				`<th class="wp-block-statik-post-type-table__read-more">`,
				'Read More',
				`</th>`,
			].join( '' );
		}
	}
}
