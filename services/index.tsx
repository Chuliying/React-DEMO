import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;


// get all posts
export const getPosts = async (locale: string) => {
  const query = gql`
    query getPosts($locale: Locale!) {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
              createdAt
            }
            slug

            createdAt
            featureImage {
              url
            }
            localizations(locales: [$locale], includeCurrent: true) {
              title
              excerpt
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, { locale });
  return result.postsConnection.edges;
};


// get post data
export const getPostDetails = async (slug: string, locale: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $locale: Locale!) {
      post(where: { slug: $slug }) {
        featureImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug

        categories {
          name
          slug
        }
        localizations(locales: [$locale], includeCurrent: true) {
          title
          excerpt
          content {
            raw
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, locale });

  return result.post;
};


// get all categories
export const getCategories = async (locale: string) => {
  const query = gql`
    query GetCategories($locale: Locale!) {
      categories(locales: [$locale]) {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { locale });
  return result.categories;
};

// get latest posts
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails()  {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};


// get same categories posts
export const getSimilarPosts = async (categories: [string], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categories });

  return result.posts;
};

// get posts by category
export const getCategoryPost = async (slug: string, locale: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!,$locale: Locale!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
           localizations(locales: [$locale], includeCurrent: true) {
              title
              excerpt
            }
            featureImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, locale });

  return result.postsConnection.edges;
};
