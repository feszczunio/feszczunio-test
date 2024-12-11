import { TableRowRenderer } from './TableRowRenderer';
import { TableRowViewModel } from './TableRowViewModel';
import { TableHeadRowRenderer } from './TableHeadRowRenderer';

export class TableView {
	/**
	 * @param {string} selector
	 */
	constructor( selector ) {
		this.rootElement = document.querySelector( selector );
	}

	empty() {
		this.rootElement.innerHTML = '';
	}

	renderTable() {
		const table = document.createElement( 'table' );
		table.innerHTML = [ '<thead>', '</thead>', '<tbody>', '</tbody>' ].join(
			''
		);
		this.rootElement.append( table );
	}

	/**
	 * @param {TableRowViewModel[]} posts
	 */
	renderTableHeadRow( posts ) {
		const table = this.rootElement.querySelector( 'table' );
		const thead = table.querySelector( 'thead' );
		const tableHeadRow = TableHeadRowRenderer.render( posts[ 0 ] );
		thead.append( tableHeadRow );
	}

	/**
	 * @param {TableRowViewModel[]} posts
	 */
	renderRows( posts ) {
		const table = this.rootElement.querySelector( 'table' );
		const tbody = table.querySelector( 'tbody' );

		const tableRowsElements = posts.map( ( post ) => {
			const element = TableRowRenderer.render( post );
			this.bindTableRowEffects( element, post );
			return element;
		} );
		tbody.append( ...tableRowsElements );
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

	/**
	 * @param {Element}           element
	 * @param {TableRowViewModel} post
	 */
	bindTableRowEffects( element, post ) {
		if ( post.followUpArea !== 'area' ) {
			return;
		}
		element.addEventListener( 'click', () => {
			window.location.href = post.link;
		} );
	}
}
