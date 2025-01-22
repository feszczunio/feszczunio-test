import { BlockControls as WPBlockControls } from '@wordpress/block-editor';
import { InnerBlocksControls } from './InnerBlocksControls';
import { useBlockClientId } from '@statik-space/wp-statik-editor-utils';

export function BlockControls() {
	const clientId = useBlockClientId();

	return (
		<WPBlockControls>
			<InnerBlocksControls rootClientId={ clientId } />
		</WPBlockControls>
	);
}
