import { useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { Filters } from '@/types/filters';

export default function useFiltersUrlSync(filters: Filters) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([name, filter]) => {
      if (filter.options.length === 0) return;

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
      // @ts-expect-error
      { pathname, params, query },
      { scroll: false },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
}
