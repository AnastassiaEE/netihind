/**
 * Extracts up to the first two sentences from a given text.
 *
 * Strict behavior:
 * - 0 sentences → returns an empty string
 * - 1 sentence  → returns that sentence
 * - 2+ sentences → returns the first two sentences
 *
 * @param text - Source plain text (no HTML)
 * @returns A string containing up to two sentences or an empty string.
 */
export const extractFirstTwoSentences = (text: string) => {
  if (!text?.trim()) return '';
  const sentences = text.match(/[^.!?]+[.!?]/g);
  if (!sentences || sentences.length === 0) {
    return '';
  }
  return sentences.slice(0, 2).join('').trim();
};

/**
 * Splits a comma-separated string into an array of non-empty strings.
 *
 * @param value - The optional string to split
 * @returns An array of non-empty substrings. Returns an empty array if the input is undefined or empty
 */
export const splitString = (value?: string) =>
  (value || '').split(',').filter(Boolean);
