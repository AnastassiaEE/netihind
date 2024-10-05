import { fetchAPI } from './wpFetch';

export async function getPosts(language: string) {
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
