import { rwdAttribute } from '@statik-space/wp-statik-utils';

export class StyleRenderer {
	/**
	 * @param {Object} attributes
	 */
	static render( attributes ) {
		const tpl = document.createElement( 'template' );
		tpl.innerHTML = this.renderStyle( attributes );
		return tpl.content.firstElementChild;
	}

	/**
	 * @param {Object} attributes
	 */
	static renderStyle( attributes ) {
		const cardsPerRowRwd = rwdAttribute( attributes.cardsPerRow );

		const style = `
		<style>
		.wp-block-${ attributes.blockId } {
		  --wp-block-statik-post-type-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.mobile };
		}
		@media (min-width: 991px) {
		  .wp-block-${ attributes.blockId } {
			--wp-block-statik-post-type-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.tablet };
		  }
		}
		@media (min-width: 1200px) {
		  .wp-block-${ attributes.blockId } {
			--wp-block-statik-post-type-cards--attr--cardsPerRow: ${ cardsPerRowRwd.inherit.desktop };
		  }
		}
		</style>
	  `;

		return style;
	}
}
