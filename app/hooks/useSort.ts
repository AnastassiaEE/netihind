import { usePathname, useRouter } from '@/i18n/routing';
import { getSortOptions } from '@/utils/packagesHelper';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useSort(options: { [key: string]: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const [usedOptions, setUsedOptions] = useState(options);

  useEffect(() => {
    setUsedOptions(options);
  }, [options]);

  const handleOptionClick = (option: string) => {
    setUsedOptions(getSortOptions(option));
    searchParams.set('sort', option);
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    router.replace(
      // @ts-expect-error
      { pathname, params, query: searchParamsObject },
      { scroll: false },
    );
  };

  return {
    usedOptions,
    handleOptionClick,
  };
}
