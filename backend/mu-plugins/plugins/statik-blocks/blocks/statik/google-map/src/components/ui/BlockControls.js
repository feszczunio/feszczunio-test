import { BlockControls as WPBlockControls } from '@wordpress/block-editor';
import {
	ReplaceUrlControl,
	useBlockAttributes,
} from '@statik-space/wp-statik-editor-utils';
import { useSetMapAttributes } from '../../hooks/useSetMapAttributes';
import { getMapUrl } from '../../utils/getMapUrl';

export function BlockControls() {
	const { attributes } = useBlockAttributes();
	const { latitude, longitude, zoom } = attributes;
	const handleChangeValue = useSetMapAttributes();

	return (
		<WPBlockControls group="other">
			<ReplaceUrlControl
				mediaURL={ getMapUrl( latitude, longitude, zoom ) }
				onSelectURL={ handleChangeValue }
			/>
		</WPBlockControls>
	);
}
