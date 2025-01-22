import { useBlockAttributes } from '@statik-space/wp-statik-editor-utils';

export const useIsIconBgColorRespected = () => {
	const {
		attributes: { className = '' },
	} = useBlockAttributes();

	return (
		className.includes( 'is-style-rectangular' ) ||
		className.includes( 'is-style-circular' )
	);
};
