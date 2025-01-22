import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { mediaPosition } from './utils/mediaPosition';

export default function VideoSave( props ) {
	const { attributes } = props;
	const {
		height,
		width,
		url,
		hasOverlay,
		overlayImage,
		overlayColor,
		overlayColorOpacity,
		overlayHasParallax,
		overlayIsRepeated,
		overlayFocalPoint,
	} = attributes;

	const blockProps = useBlockProps.save( {
		style: {
			height,
			width,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'wp-block-statik-video__inner-container',
	} );

	const overlayStyles = {
		backgroundColor: overlayColor,
		opacity: `${ overlayColorOpacity }%`,
	};

	const overlayImageStyles = {
		backgroundImage: `url(${ overlayImage })`,
		backgroundSize: overlayIsRepeated ? 'auto' : 'cover',
		backgroundRepeat: overlayIsRepeated ? 'repeat' : 'no-repeat',
		backgroundAttachment: overlayHasParallax ? 'fixed' : 'scroll',
		backgroundPosition:
			overlayImage && overlayFocalPoint
				? mediaPosition( overlayFocalPoint )
				: undefined,
	};

	return (
		<div { ...blockProps }>
			<div className="wp-block-statik-video__box">
				<iframe
					title="Video"
					width={ width }
					height={ height }
					src={ url }
					allow="autoplay; encrypted-media"
					allowFullScreen
				/>
			</div>
			{ hasOverlay && (
				<div className="wp-block-statik-video__overlay">
					{ overlayImage && (
						<div
							className="wp-block-statik-video__background-image"
							style={ overlayImageStyles }
						/>
					) }
					{ overlayColor && (
						<div
							className="wp-block-statik-video__background"
							style={ overlayStyles }
						/>
					) }
					<div className="wp-block-statik-video__body">
						<div { ...innerBlocksProps } />
					</div>
				</div>
			) }
		</div>
	);
}
