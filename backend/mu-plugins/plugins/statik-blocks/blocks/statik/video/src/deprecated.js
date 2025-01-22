import { InnerBlocks } from '@wordpress/block-editor';

const v1 = {
	attributes: {
		url: {
			type: 'string',
		},
		width: {
			type: 'string',
			default: '100%',
		},
		height: {
			type: 'string',
			default: '320px',
		},
		openAsModal: {
			type: 'boolean',
			default: false,
		},
		followUp: {
			type: 'string',
			enum: [ 'none', 'modal', 'redirect' ],
			default: 'none',
		},
		hasOverlay: {
			type: 'boolean',
			default: false,
		},
		overlayColor: {
			type: 'string',
		},
		overlayColorOpacity: {
			type: 'number',
			default: 80,
		},
		overlayImage: {
			type: 'string',
		},
		overlayHasParallax: {
			type: 'boolean',
			default: false,
		},
		overlayIsRepeated: {
			type: 'boolean',
			default: false,
		},
		overlayAltText: {
			type: 'string',
		},
		overlayFocalPoint: {
			type: 'object',
		},
	},
	save() {
		return <InnerBlocks.Content />;
	},
};

const deprecated = [ v1 ];

export default deprecated;
