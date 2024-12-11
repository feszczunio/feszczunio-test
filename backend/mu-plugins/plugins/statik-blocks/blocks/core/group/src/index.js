/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import icon from './assets/icon';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from '../block.json';
import save from './save';
import transforms from './transforms';
import variations from './variations';
import './style.scss';
import { overrideBlockType } from '@statik-space/wp-statik-editor-utils';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			style: {
				color: {
					text: '#000000',
					background: '#ffffff',
				},
			},
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#cf2e2e',
					fontSize: 'large',
					content: __( 'One.' ),
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#ff6900',
					fontSize: 'large',
					content: __( 'Two.' ),
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#fcb900',
					fontSize: 'large',
					content: __( 'Three.' ),
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#00d084',
					fontSize: 'large',
					content: __( 'Four.' ),
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#0693e3',
					fontSize: 'large',
					content: __( 'Five.' ),
				},
			},
			{
				name: 'core/paragraph',
				attributes: {
					customTextColor: '#9b51e0',
					fontSize: 'large',
					content: __( 'Six.' ),
				},
			},
		],
	},
	transforms,
	edit,
	save,
	deprecated,
	variations,
};

overrideBlockType( name, metadata, settings );
