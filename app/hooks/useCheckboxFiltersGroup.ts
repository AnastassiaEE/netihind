import { useParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

export default function useCheckboxFilterGroup(filters: {
  [key: string]: {
    options: {
      value: string;
      label: string;
    }[];
    selected: {
      value: string;
      label: string;
    }[];
  };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const handleClear = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    Object.keys(filters).forEach((filterKey) => {
      newSearchParams.delete(filterKey);
    });
    const searchParamsObject = Object.fromEntries(newSearchParams.entries());
    router.replace(
      // @ts-expect-error
      { pathname, params, query: searchParamsObject },
      { scroll: false },
    );
  };

  return {
    handleClear,
  };
}
