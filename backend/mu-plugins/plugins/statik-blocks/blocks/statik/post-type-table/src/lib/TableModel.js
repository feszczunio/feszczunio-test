import { TableRowViewModel } from './TableRowViewModel';

export class TableModel {
	/**
	 * @type {TableRowViewModel[]}
	 */
	posts = [];

	/**
	 * @param {Object} post
	 * @param {Object} attributes
	 */
	addPost( post, attributes ) {
		this.posts.push( new TableRowViewModel( post, attributes ) );
	}
}
