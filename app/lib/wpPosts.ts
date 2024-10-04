import { fetchAPI } from './wpFetch';

export async function getPosts(language: string, title: string) {
  const data = await fetchAPI(
    `query posts($language: LanguageCodeFilterEnum = ALL, $title: String = "") {
  posts(where: {language: $language, title: $title}) {
    nodes {
      content(format: RAW)
    }
  }
}`,
    {
      variables: {
        language,
        title,
      },
    },
  );

  return data?.posts?.nodes;
}
