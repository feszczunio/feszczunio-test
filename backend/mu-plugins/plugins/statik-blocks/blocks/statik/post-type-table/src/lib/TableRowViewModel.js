export class TableRowViewModel {
	/**
	 * @param {Object} post
	 * @param {Object} attributes
	 */
	constructor( post, attributes ) {
		this.post = post;
		this.attributes = attributes;
	}

	get followUpArea() {
		return this.attributes.followUpArea;
	}

	get link() {
		return this._getUrlHref();
	}

	get displayCategories() {
		return this.attributes.displayCategories;
	}

	get categories() {
		return this._getTaxonomyTerms( 'categories' );
	}

	get displayDate() {
		return this.attributes.displayLastUpdatedDate;
	}

	get dateTime() {
		return this._getDayYYYYMMDD( this.post.modified_gmt );
	}

	get displayTitle() {
		return this.attributes.displayTitle;
	}

	get title() {
		return this.post.title.rendered;
	}

	get displayTags() {
		return this.attributes.displayCategories;
	}

	get tags() {
		return this._getTaxonomyTerms( 'tags' );
	}

	get displayReadMoreButton() {
		return this.attributes.displayReadMoreButton;
	}

	/**
	 * @param {Date} dateToConvert
	 */
	_getDayYYYYMMDD( dateToConvert ) {
		const date = new Date( dateToConvert );
		const dateString = new Date(
			date.getTime() - date.getTimezoneOffset() * 60000
		)
			.toISOString()
			.split( 'T' )[ 0 ];

		return dateString;
	}

	/**
	 * @param {string} taxonomyName
	 */
	_getTaxonomyTerms( taxonomyName ) {
		const taxonomyIds = this.post[ taxonomyName ] ?? [];
		const mergedTerms = this.post._embedded?.[ 'wp:term' ]?.flat() ?? [];

		const terms = mergedTerms.filter( ( term ) =>
			taxonomyIds.includes( term.id )
		);

		return terms;
	}

	_getUrlHref() {
		const { destination } = this.attributes;
		if ( destination === 'default' ) {
			return this.post.link;
		}

		const propertyPath = destination;
		const urlHref = this._getObjectPropertyByPath(
			this.post,
			propertyPath
		);
		return urlHref;
	}

	/**
	 * @param {Object} object
	 * @param {string} path
	 */
	_getObjectPropertyByPath( object, path ) {
		const keys = path
			.split( '.' )
			.map( ( prop ) => this._convertCamelToSnake( prop ) );
		let propertyValue = object;
		for ( const key of keys ) {
			if ( propertyValue.hasOwnProperty( key ) ) {
				propertyValue = propertyValue[ key ];
			} else {
				propertyValue = undefined;
				console.error(
					`The provided path '${ path }' cannot be resolved`
				);
				break;
			}
		}
		return propertyValue;
	}

	/**
	 * @param {string} camelString
	 */
	_convertCamelToSnake( camelString ) {
		return camelString.replace( /[A-Z]/g, ( letter, index ) => {
			const separator = index === 0 ? '' : '_';
			return separator + letter.toLowerCase();
		} );
	}
}
