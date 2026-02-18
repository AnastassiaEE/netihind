import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";

/**
 * Type guard to check if a given string is a valid locale.
 *
 * This function narrows the type from `string` to `Locale` if the value
 * exists in the list of supported locales defined in the routing configuration.
 *
 * @param value - The string value to check
 * @returns `true` if the value is a supported locale, otherwise `false`
 */
export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}

/**
 * Normalize a URL path by removing any trailing slashes.
 *
 * Ensures that paths are treated consistently.
 * The root path '/' is preserved as-is.
 *
 * @param path - The URL path to normalize
 * @returns The normalized path without trailing slashes
 */
export function normalizePath(path: string) {
  if (path === '/') return '/';
  return path.replace(/\/+$/, '');
}
