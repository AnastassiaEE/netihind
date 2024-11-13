import { useState } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams, useSearchParams } from 'next/navigation';

export default function useButtonsFilter(filters: { [key: string]: boolean }) {
  const [usedFilters, setUsedFilters] = useState(filters);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  console.log(searchParams);

  const activateFilterButton = (activeFilter: string) => {
    const filters = { ...usedFilters };
    Object.keys(filters).map((filter) =>
      filter === activeFilter ? (filters[filter] = true) : (filters[filter] = false),
    );
    setUsedFilters(filters);
  };

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const clickedFilter = (e.target as HTMLButtonElement).name;
    searchParams.set('filter', clickedFilter);
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    router.replace(
      // @ts-expect-error
      { pathname, params, query: searchParamsObject },
      { scroll: false },
    );
    activateFilterButton(clickedFilter);
  };

  return {
    usedFilters,
    handleFilterClick,
  };
}
