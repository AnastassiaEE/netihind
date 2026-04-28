import { FilterOption } from '@/types/filters.types';

/**
 * Maps an array of selected values (names or IDs) to their corresponding IDs.
 *
 * Each item in `selected` can be:
 * - a label (name) of an option, which will be mapped to its ID
 * - an ID that already exists in `options`
 *
 * Items that do not match any name or ID are ignored.
 *
 * @param selected - Array of selected strings (names or IDs)
 * @param options - Array of option objects with `name` and `id` properties
 *
 * @returns Array of valid IDs corresponding to the selected items.
 */
export const mapNamesOrIdsToIds = (
  selected: string[],
  options: FilterOption[],
): string[] => {
  if (!selected.length) return [];

  const labelToId = new Map(
    options.map((opt) => [String(opt.name).toLowerCase(), String(opt.id)]),
  );
  const validIds = new Set(options.map((opt) => String(opt.id)));

  return selected
    .map((item) => {
      const byLabel = labelToId.get(item.toLowerCase());
      if (byLabel) return byLabel;
      if (validIds.has(item)) return item;
      return null;
    })
    .filter((v): v is string => Boolean(v));
};
