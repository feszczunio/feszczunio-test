import { CardViewModel } from './CardViewModel';

export class CardsModel {
	/**
	 * @type {CardViewModel[]}
	 */
	posts = [];

	/**
	 * @param {Object} post
	 * @param {Object} attributes
	 */
	addPost( post, attributes ) {
		this.posts.push( new CardViewModel( post, attributes ) );
	}
}
