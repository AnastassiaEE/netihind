import { fetchAPI } from './wpFetch';

export async function getPages(language: string, title: string) {
  const data = await fetchAPI(
    `query pages($language: LanguageCodeFilterEnum = ALL, $title: String = "") {
  pages(where: {language: $language, title: $title}) {
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
  return data?.pages?.nodes;
}
