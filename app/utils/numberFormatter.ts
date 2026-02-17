/**
 * Formats a number as a string suitable for money display.
 *
 * - If the value is an integer, it returns it without decimals.
 * - If the value has decimals, it returns the value fixed to 2 decimal places.
 * - If the value is undefined, it returns an empty string.
 *
 * @param value - The numeric value to format
 * @returns Formatted string representing the money value
 */
export const formatMoney = (value?: number) => {
  if (value === undefined) return '';
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
};
