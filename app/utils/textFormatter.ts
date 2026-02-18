/**
 * Extracts up to the first two sentences from a given text.
 *
 * Strict behavior:
 * - 0 sentences → returns an empty string
 * - 1 sentence  → returns that sentence
 * - 2+ sentences → returns the first two sentences
 *
 * @param text - Source plain text (no HTML)
 * 
 * @returns A string containing up to two sentences or an empty string
 */
export function extractFirstTwoSentences(text: string): string {
  if (!text?.trim()) return '';
  const sentences = text.match(/[^.!?]+[.!?]/g);
  if (!sentences || sentences.length === 0) {
    return '';
  }
  return sentences.slice(0, 2).join(' ').trim();
}