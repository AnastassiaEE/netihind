/**
 * Generates an absolute URL from a relative path or an existing URL, using the provided base URL.
 *
 * This function ensures that the returned URL is fully qualified, which is useful for
 * SEO, Open Graph, JSON-LD, or any place where an absolute URL is required.
 *
 * @param url - The relative path or URL to convert (e.g., '/about' or 'contact')
 * @param baseUrl - The base URL to resolve against (e.g., 'https://example.com')
 *
 * @returns The fully qualified absolute URL as a string.
 *
 * @example
 * getPageUrl('/about', 'https://example.com'); // "https://example.com/about"
 * getPageUrl('contact', 'https://example.com'); // "https://example.com/contact"
 */
export const getPageUrl = (url: string | URL, baseUrl: string | URL) => {
  return new URL(url, baseUrl).toString();
};
