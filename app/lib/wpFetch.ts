import { notFound } from 'next/navigation';

//process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

export async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers: { [key: string]: string } = { 'Content-Type': 'application/json' };

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

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
    notFound();
  }
  return json.data;
}
