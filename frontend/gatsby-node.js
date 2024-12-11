const { ArchiveCreator } = require('./lib/archive-creator');
const postsArchiveTemplatePath = require.resolve(
  './src/templates/PostsArchive.js',
);

exports.createPages = async (args) => {
  const { graphql, actions, reporter } = args;
  const { createPage } = actions;

  const entitiesPerPage = 4;

  const archiveCreator = new ArchiveCreator(
    graphql,
    reporter,
    createPage,
    postsArchiveTemplatePath,
  );

  await Promise.all([
    // Insights Archive
    archiveCreator.create(
      '/insights',
      'allPosts',
      `first: ${entitiesPerPage}, where: {orderby: {field: DATE, order: ASC}}`,
      `
                 author {
                     node {
                        name
                        slug
                      }
                  }
                 categories {
                      nodes {
                        name
                        slug
                      }
                    }
                 `,
      (chunks) => ({
        postType: 'post',
        allCategories: getAllCategories(chunks),
        allAuthors: getAllAuthors(chunks),
      }),
    ),

    // Categories Archives
    (async () => {
      const categories = await fetchCategories(graphql, reporter);
      await Promise.all(
        categories.map((category) => {
          return archiveCreator.create(
            category.link,
            'allPosts',
            `first: ${entitiesPerPage}, where: {orderby: {field: DATE, order: ASC}, categoryId: ${category.databaseId} }`,
            ``,
            () => ({
              postType: 'post',
              category: category.slug,
            }),
          );
        }),
      );
    })(),
  ]);
};

const getAllCategories = (chunks) => {
  let allCategories = new Map();
  chunks.forEach((chunk) => {
    chunk.forEach((post) => {
      post.categories.nodes.forEach((node) => {
        allCategories.set(node.name, { name: node.name, slug: node.slug });
      });
    });
  });
  return Array.from(allCategories.values());
};

const getAllAuthors = (chunks) => {
  let allAuthors = new Map();
  chunks.forEach((chunk) => {
    chunk.forEach((post) => {
      const author = post.author.node;
      allAuthors.set(author.name, { name: author.name, slug: author.slug });
    });
  });
  return Array.from(allAuthors.values());
};

const fetchCategories = async (graphql, reporter) => {
  const result = await graphql(`
    query CategoriesQuery {
      allCategories {
        nodes {
          databaseId
          link
          slug
        }
      }
    }
  `);
  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query.');
    return;
  }
  return result.data.allCategories.nodes;
};
