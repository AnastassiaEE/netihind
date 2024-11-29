import { useCallback, useState } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export default function useButtonsFilter(filters: { [key: string]: boolean }) {
  const [usedFilters, setUsedFilters] = useState(filters);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const activateFilterButton = useCallback((filter: string) => {
    setUsedFilters((prevFilters) =>
      Object.fromEntries(
        Object.keys(prevFilters).map((prevFilter) => [prevFilter, prevFilter === filter]),
      ),
    );
  }, []);

  const handleFilterClick = useCallback(
    (filter: string) => {
      router.replace(
        // @ts-expect-error
        { pathname, params, query: { filter: filter } },
        { scroll: false },
      );
      activateFilterButton(filter);
    },
    [router, pathname, params, activateFilterButton],
  );

  return {
    usedFilters,
    handleFilterClick,
  };
}
