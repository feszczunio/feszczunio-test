import { useEffect } from '@wordpress/element';
import {
	useBlockAttributes,
	useBlockRootAttributes,
	useBlockIndex,
} from '@statik-space/wp-statik-editor-utils';

export const useTabEffects = () => {
	const { setAttributes } = useBlockAttributes();
	const { attributes: tabsAttributes } = useBlockRootAttributes();
	const { preSelectedTab } = tabsAttributes;
	const blockIndex = useBlockIndex();

	useEffect( () => {
		setAttributes( {
			isPreSelected: Number( blockIndex ) === Number( preSelectedTab ),
		} );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ preSelectedTab ] );
};
