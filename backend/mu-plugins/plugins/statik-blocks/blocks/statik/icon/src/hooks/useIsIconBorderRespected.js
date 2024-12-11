import { useBlockAttributes } from '@statik-space/wp-statik-editor-utils';

export const useIsIconBorderRespected = () => {
	const {
		attributes: { className = '' },
	} = useBlockAttributes();

	return className.includes( 'is-style-outline' );
};
