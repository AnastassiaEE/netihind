import { fetchAPI } from '@/lib/wpFetch';

/**
 * Fetches a list of WordPress posts optionally filtered by language.
 *
 * Retrieves posts in ascending order by date, including their raw content,
 * title, slug, excerpt, featured image, and language code.
 *
 * @param language - Optional language code (e.g., "EN", "ET"). Defaults to all languages if not provided.
 * @returns A Promise resolving to an array of post objects
 */
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

  return data?.posts?.nodes ?? [];
}

/**
 * Fetches a single WordPress post by its slug.
 *
 * Retrieves detailed post information including raw content, title, slug,
 * excerpt, date, and featured image.
 *
 * @param id - The slug of the post to fetch
 * @returns A Promise resolving to the post object or `null` if not found
 */
export async function getPostBySlug(id: string) {
  const data = await fetchAPI(
    `query post($id: ID = "") {
  post(id: $id, idType: SLUG) {
    content(format: RAW)
    slug
    date
    title
    excerpt(format: RAW)
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

  return data?.post ?? null;
}

/**
 * Fetches only the slugs of all WordPress posts.
 *
 * Useful for generating dynamic routes or prefetching paths.
 *
 * @returns A Promise resolving to an array of post objects
 */
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

  return data?.posts?.nodes ?? [];
}
