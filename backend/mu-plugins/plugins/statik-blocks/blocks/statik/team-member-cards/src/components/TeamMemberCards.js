import { Warning } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';
import {
	MAX_PER_PAGE,
	TEAM_MEMBER_POST_TYPE,
	DEFAULT_PER_PAGE,
} from '../consts';
import {
	useBlockAttributes,
	useEntitiesByPostType,
} from '@statik-space/wp-statik-editor-utils';
import { __ } from '@wordpress/i18n';
import { CardsRows } from './CardsRows';
import { CardPreview } from './CardPreview';
import { Card } from './Card';
import { select } from '@wordpress/data';

export function TeamMemberCards() {
	const { attributes } = useBlockAttributes();

	const { query, excludeCurrentPost } = attributes;

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
		useEntitiesByPostType( TEAM_MEMBER_POST_TYPE, params );

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
