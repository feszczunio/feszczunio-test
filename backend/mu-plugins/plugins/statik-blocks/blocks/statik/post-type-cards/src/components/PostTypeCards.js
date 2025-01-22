import { Warning } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import { DEFAULT_PER_PAGE, MAX_PER_PAGE } from '../consts';
import {
	useEntitiesByPostType,
	useBlockAttributes,
} from '@statik-space/wp-statik-editor-utils';
import { __ } from '@wordpress/i18n';
import { CardsRows } from './CardsRows';
import { Card } from './Card';
import { CardPreview } from './CardPreview';
import { select } from '@wordpress/data';

export function PostTypeCards() {
	const { attributes } = useBlockAttributes();

	const { postType, query, excludeCurrentPost } = attributes;

	const postId = select( 'core/editor' ).getCurrentPostId();

	const params = useMemo( () => {
		const excludeArray = query.exclude ? [].concat( query.exclude ) : [];

		if ( excludeCurrentPost ) {
			excludeArray.push( postId );
		}

		return {
			...query,
			per_page: MAX_PER_PAGE,
			exclude: excludeArray.length ? excludeArray : undefined,
		};
	}, [ query, excludeCurrentPost, postId ] );

	const { hasEntities, isResolvingEntities, hasResolvedEntities, entities } =
		useEntitiesByPostType( postType, params );

	const entitiesLimit = query.per_page ?? DEFAULT_PER_PAGE;

	if ( hasResolvedEntities && ! hasEntities ) {
		return (
			<Warning>
				{ __( 'Could not find any entities.', 'statik-blocks' ) }
			</Warning>
		);
	}

	if ( isResolvingEntities ) {
		const limitedEntities = [ ...Array( entitiesLimit ).keys() ].map(
			( key ) => ( { id: key } )
		);
		return (
			<CardsRows
				key="cards-rows-preview"
				entities={ limitedEntities }
				cardComponent={ CardPreview }
			/>
		);
	}

	if ( hasEntities ) {
		const limitedEntities = entities.slice( 0, entitiesLimit );
		return (
			<CardsRows
				key="cards-rows"
				entities={ limitedEntities }
				cardComponent={ Card }
			/>
		);
	}

	return null;
}
