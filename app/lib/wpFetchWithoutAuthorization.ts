const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

export async function fetchAPINotAuthorizied(query = '', { variables }: Record<string, any> = {}) {
  const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    headers,
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
