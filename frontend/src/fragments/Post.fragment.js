import { graphql } from 'gatsby';

export const PostFragment = graphql`
  fragment Post on WP_Post {
    id
    databaseId
    title(format: RENDERED)
    slug
    uri
    date
    dateFormat(format: DATE)
    timeFormat: dateFormat(format: TIME)
    readTime
    seo {
      node {
        ...NodeSeoField
      }
    }
    featuredImage {
      node {
        ...MediaItem
      }
    }
    author {
      node {
        name
        slug
      }
    }
    categories {
      nodes {
        slug
        name
        uri
      }
    }
    tags {
      nodes {
        slug
        name
        uri
      }
    }
    gutenbergBlocks {
      nodes {
        ...GutenbergBlock
      }
    }
  }
`;
