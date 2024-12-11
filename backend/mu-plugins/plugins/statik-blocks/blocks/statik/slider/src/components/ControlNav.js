import { ControlNavButton } from './ControlNavButton';
import { useInnerBlocks } from '@statik-space/wp-statik-editor-utils';

export const ControlNav = () => {
	const blocks = useInnerBlocks();

	return (
		<div className="wp-block-statik-slider__control-nav">
			{ blocks.map( ( block, index ) => (
				<ControlNavButton
					key={ block.clientId }
					index={ index }
					blockId={ block.clientId }
				/>
			) ) }
		</div>
	);
};
