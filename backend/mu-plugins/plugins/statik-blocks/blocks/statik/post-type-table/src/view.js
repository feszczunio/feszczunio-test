import { TableController } from './lib/TableController';
import { TableModel } from './lib/TableModel';
import { TableView } from './lib/TableView';

export default function ( { attributes, restBase, currentPostId } ) {
	document.addEventListener( 'DOMContentLoaded', async () => {
		const instance = new TableController(
			new TableModel(),
			new TableView( `.wp-block-${ attributes.blockId }` ),
			{
				attributes,
				restBase,
				currentPostId,
			}
		);
		await instance.init();
	} );
}
