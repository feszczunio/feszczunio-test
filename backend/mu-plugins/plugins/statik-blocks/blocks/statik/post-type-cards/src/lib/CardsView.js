import { CardRenderer } from './CardRenderer';
import { CardViewModel } from './CardViewModel';
import { StyleRenderer } from './StyleRenderer';

export class CardsView {
	/**
	 * @param {string} selector
	 */
	constructor( selector ) {
		this.rootElement = document.querySelector( selector );
	}

	empty() {
		this.rootElement.innerHTML = '';
	}

	/**
	 * @param {CardViewModel[]} posts
	 * @param {Object}          attributes
	 */
	render( posts, attributes ) {
		const cardsElements = posts.map( ( post ) =>
			CardRenderer.render( post )
		);
		this.rootElement.append( ...cardsElements );

		const style = StyleRenderer.render( attributes );
		this.rootElement.before( style );
	}

	/**
	 * @param {string} message
	 */
	renderError( message ) {
		const tpl = document.createElement( 'template' );
		tpl.innerHTML = [
			'<div class="wp-block-statik-post-type-cards__error">',
			message,
			'</div>',
		].join( '' );
		this.rootElement.append( tpl.content );
	}
}
