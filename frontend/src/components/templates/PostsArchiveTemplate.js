import React from 'react';
import clsx from 'clsx';
import { useStatikPageContext } from '@statik-space/gatsby-theme-statik';
import { useArchiveContext } from '../../contexts/ArchiveContext';
import { ArchiveItem } from '../commons/archive-item/ArchiveItem';
import ReactPaginate from 'react-paginate';
import { chunk } from 'lodash';
import { Param } from '../../utils/consts';
import { Loader } from "../commons/Loader";

export const PostsArchiveTemplate = () => {
  const { queryParams, setQueryParams, getResults, isLoading } =
    useArchiveContext();
  const { pageContext: ctx } = useStatikPageContext();

  const handlePageClick = async (data) => {
    let selected = data.selected + 1;

    await setQueryParams({ [Param.PAGE]: selected });
  };

  const perPage = queryParams[Param.PER_PAGE];
  const page = queryParams[Param.PAGE];

  const posts = getResults();
  const postsChunks = chunk(posts, perPage);
  const postsPage = postsChunks[page - 1] || [];

  return (
    <article
      id={`archive-${ctx.postType}`}
      className={clsx({
        archive: true,
        [`archive--type-${ctx.postType}`]: Boolean(ctx.postType),
        [`archive--category-${ctx.category}`]: Boolean(ctx.category),
      })}
    >
      <section className="archive-section">
        {!postsPage.length && !isLoading && (
          <h2 className="archive-error">Nothing Found</h2>
        )}
        {isLoading && (
          <Loader />
        )}
        <section className="archive-list">
          {postsPage.map((entity, index) => (
            <ArchiveItem
              key={entity.databaseId}
              entity={entity}
              isFeatured={index === 0}
            />
          ))}
        </section>

        <ReactPaginate
          previousLabel={'←'}
          nextLabel={'→'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={postsChunks.length}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination__list'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          forcePage={page - 1}
          pageClassName={'pagination__list-item'}
        />
      </section>
    </article>
  );
};
