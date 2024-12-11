import { InspectorControls } from './components/ui/InspectorControls';
import { useBlockProps } from '@wordpress/block-editor';
import { VideoCards } from './components/VideoCards';
import {
	useRwdAttribute,
	useBlockStyle,
} from '@statik-space/wp-statik-editor-utils';
import './editor.scss';

export default function VideoCardsEdit( props ) {
	const { attributes } = props;

	const { cardsPerRow } = attributes;

	const blockProps = useBlockProps();

	const cardsPreRowRwd = useRwdAttribute( cardsPerRow );

	const defaultStyle = useBlockStyle( `
		--wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPreRowRwd.inherit.default };
	` );

	const mobileStyle = useBlockStyle(
		`
		--wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPreRowRwd.inherit.mobile };
	`,
		{
			before: '@media (min-width: 0) {',
			after: '}',
		}
	);

	const tabletStyle = useBlockStyle(
		`
		--wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPreRowRwd.inherit.tablet };
	`,
		{
			before: '@media (min-width: 768px) {',
			after: '}',
		}
	);

	const desktopStyle = useBlockStyle(
		`
		--wp-block-statik-video-cards--attr--cardsPerRow: ${ cardsPreRowRwd.inherit.desktop };
	`,
		{
			before: '@media (min-width: 1000px) {',
			after: '}',
		}
	);

	return (
		<>
			<InspectorControls />
			<div { ...blockProps }>
				<style { ...defaultStyle } />
				<style { ...mobileStyle } />
				<style { ...tabletStyle } />
				<style { ...desktopStyle } />
				<VideoCards />
			</div>
		</>
	);
}
