import { CardsController } from './lib/CardsController';
import { CardsModel } from './lib/CardsModel';
import { CardsView } from './lib/CardsView';

export default function ( { attributes, restBase, currentPostId } ) {
	document.addEventListener( 'DOMContentLoaded', async () => {
		const instance = new CardsController(
			new CardsModel(),
			new CardsView( `.wp-block-${ attributes.blockId }` ),
			{
				attributes,
				restBase,
				currentPostId,
			}
		);
		await instance.init();
	} );
}
