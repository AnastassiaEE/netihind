import { fetchAPI } from '@/lib/wpFetch';

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
