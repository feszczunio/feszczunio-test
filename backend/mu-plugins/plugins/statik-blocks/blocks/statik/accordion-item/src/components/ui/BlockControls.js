import { BlockControls as WPBlockControls } from '@wordpress/block-editor';
import { InnerBlocksControls } from '../../../../accordion/src/components/ui/InnerBlocksControls';
import { useBlockRootClientId } from '@statik-space/wp-statik-editor-utils';

export function BlockControls() {
	const rootClientId = useBlockRootClientId();

	return (
		<WPBlockControls>
			<InnerBlocksControls rootClientId={ rootClientId } />
		</WPBlockControls>
	);
}
