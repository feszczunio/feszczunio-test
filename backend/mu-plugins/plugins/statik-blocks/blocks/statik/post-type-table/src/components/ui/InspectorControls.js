import {
	PanelBody,
	BaseControl,
	RangeControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	InspectorAdvancedControls,
	InspectorControls as WPInspectorControls,
} from '@wordpress/block-editor';
import {
	QueryControl,
	useBlockAttributes,
	useBlockAcfSchemaOptions,
} from '@statik-space/wp-statik-editor-utils';
import { DEFAULT_PER_PAGE, MAX_PER_PAGE } from '../../consts';

export function InspectorControls() {
	const { attributes, setAttributes } = useBlockAttributes();

	const {
		postType,
		query,
		displayTitle,
		displayCategories,
		displayTags,
		displayLastUpdatedDate,
		displayReadMoreButton,
		followUpArea,
		destination,
		excludeCurrentPost,
	} = attributes;

	const isCardClickable = followUpArea !== 'none';

	const { per_page: perPage = DEFAULT_PER_PAGE } = query;

	const handleQueryItemChange = ( key ) => ( value ) => {
		setAttributes( {
			query: {
				...query,
				[ key ]: value,
			},
		} );
	};

	const setFollowUpArea = ( value ) => {
		setAttributes( { followUpArea: value } );
	};

	const setDestination = ( value ) => {
		setAttributes( { destination: value } );
	};

	const toggleAttribute = ( key ) => () => {
		const currentValue = attributes[ key ];
		setAttributes( { [ key ]: ! currentValue } );
	};

	const handleApplyQuery = ( value ) => {
		setAttributes( { query: value } );
	};

	const acfOptions = useBlockAcfSchemaOptions( postType ?? '' );

	return (
		<>
			<WPInspectorControls>
				<PanelBody title={ __( 'Settings', 'statik-blocks' ) }>
					<RangeControl
						label={ __( 'Number of Cards to display' ) }
						value={ parseInt( perPage ) }
						onChange={ handleQueryItemChange( 'per_page' ) }
						min={ 1 }
						max={ MAX_PER_PAGE }
						required
					/>
				</PanelBody>
				<PanelBody title={ __( 'Layout', 'statik-blocks' ) }>
					<ToggleControl
						label={ __( 'Display Entity Title', 'statik-blocks' ) }
						checked={ displayTitle }
						onChange={ toggleAttribute( 'displayTitle' ) }
					/>
					<ToggleControl
						label={ __( 'Display Categories', 'statik-blocks' ) }
						checked={ displayCategories }
						onChange={ toggleAttribute( 'displayCategories' ) }
					/>
					<ToggleControl
						label={ __( 'Display Tags', 'statik-blocks' ) }
						checked={ displayTags }
						onChange={ toggleAttribute( 'displayTags' ) }
					/>
					<ToggleControl
						label={ __(
							'Display Last Updated Date',
							'statik-blocks'
						) }
						checked={ displayLastUpdatedDate }
						onChange={ toggleAttribute( 'displayLastUpdatedDate' ) }
					/>
					<ToggleControl
						label={ __(
							'Display Read More Button',
							'statik-blocks'
						) }
						checked={ displayReadMoreButton }
						onChange={ () => {
							toggleAttribute( 'displayReadMoreButton' )();
							if (
								displayReadMoreButton &&
								followUpArea === 'button'
							) {
								setAttributes( { followUpArea: 'none' } );
							}
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Follow-up action', 'statik-blocks' ) }>
					<SelectControl
						label={ __( 'Follow-up area', 'statik-blocks' ) }
						options={ [
							{
								value: 'none',
								label: __( 'No follow-up', 'statik-blocks' ),
							},
							{
								value: 'area',
								label: __(
									'Row area is clickable',
									'statik-blocks'
								),
							},
							{
								value: 'button',
								label: __(
									'Read More button is clickable',
									'statik-blocks'
								),
								disabled: ! displayReadMoreButton,
							},
						] }
						value={ followUpArea }
						onChange={ setFollowUpArea }
					/>
					{ isCardClickable && (
						<SelectControl
							label={ __( 'Destination', 'statik-blocks' ) }
							options={ [
								{
									value: 'default',
									label: __( 'Default', 'statik-blocks' ),
								},
								...( acfOptions.length
									? acfOptions
									: [
											{
												value: 'none',
												label: __(
													'No acf fields of url type associated with selected post type',
													'statik-blocks'
												),
												disabled: true,
											},
									  ] ),
							] }
							value={ destination }
							onChange={ setDestination }
						/>
					) }
				</PanelBody>
			</WPInspectorControls>
			<InspectorAdvancedControls>
				<BaseControl>
					<ToggleControl
						label={ __( 'Exclude current post', 'statik-blocks' ) }
						checked={ excludeCurrentPost }
						onChange={ toggleAttribute( 'excludeCurrentPost' ) }
					/>
					<QueryControl
						value={ query }
						onApplyQuery={ handleApplyQuery }
					/>
				</BaseControl>
			</InspectorAdvancedControls>
		</>
	);
}
