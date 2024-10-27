const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

export async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
  }
  return json.data;
}
