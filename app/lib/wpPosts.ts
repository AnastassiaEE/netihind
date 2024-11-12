import { fetchAPI } from '@/lib/wpFetch';

export async function getPosts(language?: string) {
  const data = await fetchAPI(
    `query posts($language: LanguageCodeFilterEnum = ALL) {
  posts(where: {language: $language, orderby: {field: DATE, order: ASC}}) {
    nodes {
      content(format: RAW)
      slug
      date
      title
      featuredImage {
        node {
          altText
          sourceUrl(size: LARGE)
        }
      }
      language {
        code
      }
      excerpt(format: RAW)
    }
  }
}`,
    {
      variables: {
        language,
      },
    },
  );

  return data?.posts?.nodes;
}

export async function getPostBySlug(id: string) {
  const data = await fetchAPI(
    `query post($id: ID = "") {
  post(id: $id, idType: SLUG) {
    content(format: RAW)
    slug
    date
    title
    featuredImage {
      node {
        altText
        sourceUrl(size: LARGE)
      }
    }
  }
}`,
    {
      variables: {
        id,
      },
    },
  );

  return data?.post;
}

export async function getPostsWithSlugsOnly() {
  const data = await fetchAPI(
    `query posts {
  posts {
    nodes {
      slug
    }
  }
}`,
  );

  return data?.posts?.nodes;
}
