import { usePathname, useRouter } from '@/i18n/routing';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useSort(selectedOption: string) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = new URLSearchParams(useSearchParams().toString());
  const [selected, setSelected] = useState(selectedOption);

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    searchParams.set('sort', option);
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    router.replace(
      // @ts-expect-error
      { pathname, params, query: searchParamsObject },
      { scroll: false },
    );
  };

  return {
    selected,
    handleOptionClick,
  };
}
