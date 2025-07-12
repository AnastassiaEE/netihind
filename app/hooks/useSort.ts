import { usePathname, useRouter } from '@/i18n/routing';
import { useParams, useSearchParams } from 'next/navigation';

export default function useSort(
  selectedOption: string,
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
  onUserChange?: () => void,
) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const handleChange = (name: string, option: string) => {
    if (option === selectedOption) return;
    onUserChange?.();
    setSelectedOption(option);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', option);
    const searchParamsObject = Object.fromEntries(newSearchParams.entries());
    router.replace(
      // @ts-expect-error
      { pathname, params, query: searchParamsObject },
      { scroll: false },
    );
  };

  return {
    handleChange,
  };
}
