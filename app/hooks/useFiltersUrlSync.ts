import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { Filters } from '@/types/filters.types';

/**
 * Synchronizes selected filters with the URL query parameters.
 *
 * This hook listens for filter state changes and updates the browser URL
 * accordingly without causing a page reload or scroll reset.
 *
 * Used to keep filter state shareable, bookmarkable, and restorable
 * on page reload.
 *
 * @param filters - Current filter state
 * @param isFiltersInitialized - Prevents syncing before filters are fully initialized
 */
export default function useFiltersUrlSync(
  filters: Filters,
  isFiltersInitialized: boolean,
) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  /**
   * Update URL query parameters whenever filters change.
   * Skips execution until filters are fully initialized to avoid
   * overwriting URL state on initial render.
   */
  useEffect(() => {
    if (!isFiltersInitialized) return;
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([name, filter]) => {
      if (filter.selected.length > 0) {
        newSearchParams.set(
          name,
          filter.selected.map((opt) => opt.label).join(','),
        );
      } else {
        newSearchParams.delete(name);
      }
    });

    const query = Object.fromEntries(newSearchParams.entries());
    router.replace(
      // `params` + `query` combination is required for i18n routing
      // @ts-expect-error - TypeScript doesn't recognize the dynamic nature of the query parameters here
      { pathname, params, query },
      { scroll: false },
    );
  }, [filters, isFiltersInitialized]);
}
