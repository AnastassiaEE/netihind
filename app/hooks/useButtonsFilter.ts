import { useState } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export default function useButtonsFilter(filters: { [key: string]: boolean }) {
  const [usedFilters, setUsedFilters] = useState(filters);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const activateFilterButton = (activeFilter: string) => {
    const filters = { ...usedFilters };
    Object.keys(filters).map((filter) =>
      filter === activeFilter ? (filters[filter] = true) : (filters[filter] = false),
    );
    setUsedFilters(filters);
  };

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedFilter = (e.target as HTMLButtonElement).name;
    router.replace(
      // @ts-expect-error
      { pathname, params, query: { filter: clickedFilter } },
      { scroll: false },
    );
    activateFilterButton(clickedFilter);
  };

  return {
    usedFilters,
    handleFilterClick,
  };
}
