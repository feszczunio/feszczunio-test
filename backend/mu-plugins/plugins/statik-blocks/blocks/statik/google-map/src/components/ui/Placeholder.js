import {
	Placeholder as WPPlaceholder,
	TextControl,
} from '@wordpress/components';
import { BlockIcon, useBlockProps } from '@wordpress/block-editor';
import { mapMarker } from '@wordpress/icons';
import { useSetMapAttributes } from '../../hooks/useSetMapAttributes';
import { __ } from '@wordpress/i18n';
import { useGoogleMapSettings } from '../../hooks/useGoogleMapSettings';

export const Placeholder = () => {
	const blockProps = useBlockProps();
	const handleChangeValue = useSetMapAttributes();
	const { apiToken } = useGoogleMapSettings();
	const isTokenAdded = Boolean( apiToken );

	return (
		<div { ...blockProps }>
			<WPPlaceholder
				icon={ <BlockIcon icon={ mapMarker } /> }
				instructions={ __(
					'Display a map that is either interactive or static.',
					'statik-blocks'
				) }
				label={ __( 'Google Maps URL', 'statik-blocks' ) }
				isColumnLayout={ false }
			>
				{ isTokenAdded ? (
					<TextControl
						label={ __( 'Google Map URL', 'statik-blocks' ) }
						onChange={ handleChangeValue }
						placeholder={ __(
							'www.google.com/maps/…',
							'statik-blocks'
						) }
						help={ __(
							'Please enter correct URL',
							'statik-blocks'
						) }
					/>
				) : (
					<p>
						{ __(
							'⚠️ API Key for Google Maps is missing. Please add to Statik Settings',
							'statik-blocks'
						) }
					</p>
				) }
			</WPPlaceholder>
		</div>
	);
};
