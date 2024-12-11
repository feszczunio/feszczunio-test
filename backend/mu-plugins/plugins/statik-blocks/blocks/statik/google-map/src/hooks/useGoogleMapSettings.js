import { useBlockData } from '@statik-space/wp-statik-editor-utils';

export function useGoogleMapSettings() {
	const data = useBlockData();

	return {
		apiToken: data?.settings?.apiToken,
	};
}
