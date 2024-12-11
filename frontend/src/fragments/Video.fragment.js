import { graphql } from 'gatsby';

export const VideoFragment = graphql`
  fragment Video on WP_Video {
    databaseId
    title
    videosCategories {
      nodes {
        name
      }
    }
    videosTags {
      nodes {
        name
      }
    }
    acf {
      videoSource
      videoUrl
      localFile {
        mediaItemUrl
      }
    }
  }
`;
