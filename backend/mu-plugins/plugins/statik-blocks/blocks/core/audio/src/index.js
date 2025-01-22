/**
 * WordPress dependencies
 */
import icon from './assets/icon';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from '../block.json';
import save from './save';
import transforms from './transforms';
import './style.scss';
import { overrideBlockType } from '@statik-space/wp-statik-editor-utils';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon,
	example: {
		attributes: {
			src: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Armstrong_Small_Step.ogg',
		},
		viewportWidth: 350,
	},
	transforms,
	deprecated,
	edit,
	save,
};

overrideBlockType( name, metadata, settings );
