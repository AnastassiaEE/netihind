const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_ENDPOINT as string;

/**
 * Sends a GraphQL request to the WordPress API and returns the response data.
 *
 * Automatically includes the Authorization header if a refresh token is provided
 * in the environment variables.
 *
 * @param query - The GraphQL query string to execute
 * @param variables - Optional variables object to be sent with the query
 *
 * @returns A Promise resolving to the `data` object returned by the WordPress API
 */
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
  }
  return json.data;
}
