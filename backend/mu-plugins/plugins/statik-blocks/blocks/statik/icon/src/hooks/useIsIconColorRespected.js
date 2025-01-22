import { useBlockAttributes } from '@statik-space/wp-statik-editor-utils';

export const useIsIconColorRespected = () => {
	const {
		attributes: { icon },
	} = useBlockAttributes();

	return Boolean( icon );
};
