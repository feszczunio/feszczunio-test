import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import icon from './icon';
import save from './save';
import deprecated from './deprecated';
import metadata from '../block.json';
import './style.scss';

const settings = {
	icon,
	edit,
	save,
	deprecated,
};

registerBlockType( metadata, settings );
