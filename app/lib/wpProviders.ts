import { fetchAPI } from '@/lib/wpFetch';

export async function getProviders(language: string) {
  const data = await fetchAPI(
    `query providers($language: LanguageCodeFilterEnum = ALL) {
        providers(where: {language: $language, orderby: {order: ASC}}) {
            nodes {
            content(format: RAW)
            slug
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
  return data?.providers?.nodes;
}
