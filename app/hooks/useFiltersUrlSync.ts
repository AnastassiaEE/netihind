import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { Filters } from '@/types/filters';

export default function useFiltersUrlSync(
  filters: Filters,
  setFilters: React.Dispatch<React.SetStateAction<Filters>>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const updatedFilters = { ...filters };

    for (const [name, filter] of Object.entries(filters)) {
      const urlValue = searchParams.get(name);
      if (!urlValue) continue;

      const selectedLabels = urlValue.split(',');
      const selectedOptions = filter.options.filter((opt) =>
        selectedLabels.includes(opt.label),
      );

      updatedFilters[name] = {
        ...filter,
        selected: selectedOptions,
      };
    }

    setFilters(updatedFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([name, filter]) => {
      filter.selected.length > 0
        ? newSearchParams.set(
            name,
            filter.selected.map((opt) => opt.label).join(','),
          )
        : newSearchParams.delete(name);
    });

    const query = Object.fromEntries(newSearchParams.entries());
    router.replace(
      // @ts-expect-error
      { pathname, params, query },
      { scroll: false },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
}
