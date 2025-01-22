import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/layout/Layout';
import { PostsArchiveTemplate } from '../components/templates/PostsArchiveTemplate';
import { Seo } from '../components/commons/seo/Seo';
import { ArchiveProvider } from '../contexts/ArchiveContext';
import { useStatikPageContext } from '@statik-space/gatsby-theme-statik/src/hooks';
import { PostsArchiveFilters } from '../components/filters/PostsArchiveFilters';
import { Sorting, Param } from '../utils/consts';

const PostsArchive = () => {
  const { pageContext } = useStatikPageContext();

  return (
    <Layout>
      <ArchiveProvider
        dataExtractor={dataExtractor}
        basePath={pageContext.basePath}
        totalItems={pageContext.total}
        cacheKey={`all-posts-${pageContext.buildTime}`}
        indexValues={indexValues}
        params={params}
      >
        <PostsArchiveFilters />
        <PostsArchiveTemplate />
      </ArchiveProvider>
    </Layout>
  );
};

export default PostsArchive;

export const Head = (props) => {
  const { path } = props;

  return (
    <Seo canonicalUrl={path}>
      <title id="head-title">Insights Archive</title>
    </Seo>
  );
};

export const query = graphql`
  query PostsArchiveQuery($ids: [ID]) {
    allPosts(where: { in: $ids }) {
      nodes {
        ...Post
      }
    }
  }
`;

const dataExtractor = (data) => data.allPosts.nodes

const indexValues = (item) => {
  return [item.title, item.author.node.name];
}

const params = [
  { id: Param.QUERY, type: 'search' },
  {
    id: Param.CATEGORIES,
    type: 'filter',
    filterFn: (item, values) =>
      values.some((value) =>
        item.categories.nodes.some((node) => node.slug === value),
      ),
  },
  {
    id: Param.AUTHORS,
    type: 'filter',
    filterFn: (item, values) =>
      values.some((value) => item.author.node.slug === value),
  },
  {
    id: Param.SORT_BY,
    type: 'sort',
    sortFns: {
      [Sorting.DEFAULT]: (items) => items,
      [Sorting.DATE_DESC]: (items) => sortByDate(items, -1),
      [Sorting.DATE_ASC]: (items) => sortByDate(items, 1),
      [Sorting.TITLE_DESC]: (items) => sortByTitle(items, -1),
      [Sorting.TITLE_ASC]: (items) => sortByTitle(items, 1),
    },
  },
  { id: Param.PAGE, type: 'other', defaultValue: '1' },
  { id: Param.PER_PAGE, type: 'other', defaultValue: '6' },
]

const sortByDate = (items, direction = 1) => {
  if (!items) {
    return [];
  }
  return items
    .slice()
    .sort(
      (a, b) =>
        direction * (new Date(a.date).getTime() - new Date(b.date).getTime()),
    );
};

const sortByTitle = (items, direction = 1) => {
  if (!items) {
    return [];
  }
  return items
    .slice()
    .sort((a, b) => direction * a.title.localeCompare(b.title));
};
