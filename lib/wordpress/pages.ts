import { fetchAPI } from '@/lib/wordpress/client';

/**
 * Fetches a WordPress page by its URI (ID) using GraphQL.
 *
 * Sends a GraphQL query to the WordPress API to retrieve the raw content
 * of the page with the given ID/URI.
 *
 * @param id - The URI or ID of the WordPress page
 * @returns A Promise resolving to the page object containing `content` in RAW format,
 *          or `undefined` if the page does not exist
 */
export async function getPage(id: string) {
  const data = await fetchAPI(
    `query page($id: ID = "") {
  page(id: $id, idType: URI) {
    content(format: RAW)
  }
}`,
    {
      variables: {
        id,
      },
    },
  );
  return data?.page;
}
