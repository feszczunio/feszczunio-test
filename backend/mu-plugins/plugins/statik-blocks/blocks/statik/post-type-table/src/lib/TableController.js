import apiFetch from '@wordpress/api-fetch';
import { TableModel } from './TableModel';
import { TableView } from './TableView';

export class TableController {
	/**
	 * @param {TableModel}                                                    model
	 * @param {TableView}                                                     view
	 * @param {{attributes: Object, restBase: string, currentPostId: string}} options
	 */
	constructor( model, view, options = {} ) {
		this.model = model;
		this.view = view;

		this.attributes = options.attributes;
		this.restBase = options.restBase;
		this.currentPostId = options.currentPostId;
	}

	async init() {
		let posts;
		try {
			posts = await this.fetchPosts();
		} catch ( error ) {
			console.error(
				'There was a problem with the fetch operation:',
				error
			);
			this.view.empty();
			this.view.renderError(
				'Sorry, something went wrong. Please try again later.'
			);
			return;
		}
		this.handleAddPosts( posts );
		this.view.empty();
		this.view.renderTable();
		this.view.renderTableHeadRow( this.model.posts );
		this.view.renderRows( this.model.posts );
	}

	async fetchPosts() {
		const query = this.attributes.query;
		const excludeArray = query.exclude ? [].concat( query.exclude ) : [];

		if ( this.attributes.excludeCurrentPost ) {
			excludeArray.push( this.currentPostId );
		}

		const updatedQuery = {
			...query,
			exclude: excludeArray.length ? excludeArray : '',
		};

		const queryString = new URLSearchParams( updatedQuery ).toString();

		return await apiFetch( {
			path: `/wp/v2/${ this.restBase }?_embed&${ queryString }`,
		} );
	}

	/**
	 * @param {Object} posts
	 */
	handleAddPosts( posts ) {
		posts.forEach( ( post ) => {
			this.model.addPost( post, this.attributes );
		} );
	}
}
