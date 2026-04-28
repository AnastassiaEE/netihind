/**
 * Formats a date string into Estonian date format (DD.MM.YYYY).
 *
 * Wraps `Date.toLocaleDateString` with fixed options for year, month, and day.
 * Optionally allows specifying a timezone.
 *
 * @param date - Date string or ISO date
 * @param timeZone - Optional IANA timezone (e.g., 'Europe/Tallinn')
 *
 * @returns Formatted date string in 'DD.MM.YYYY' format
 */
export const formatDate = (date: string, timeZone?: string) =>
  new Date(date).toLocaleDateString('et-ET', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone,
  });
