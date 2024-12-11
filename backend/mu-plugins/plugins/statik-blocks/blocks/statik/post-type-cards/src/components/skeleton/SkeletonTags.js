import { Skeleton } from '@statik-space/wp-statik-editor-utils';

export function SkeletonTags() {
	return (
		<>
			<li>
				<Skeleton.Inline>Lorem</Skeleton.Inline>
			</li>
			<li>
				<Skeleton.Inline>Dolor amet</Skeleton.Inline>
			</li>
		</>
	);
}
