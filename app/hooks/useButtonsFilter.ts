import { useState } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

export default function useButtonsFilter(options: Record<string, boolean>) {
  const [usedOptions, setUsedOptions] = useState(options);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const activateButton = (option: string) => {
    setUsedOptions((prevOptions) =>
      Object.fromEntries(
        Object.keys(prevOptions).map((prevOption) => [
          prevOption,
          prevOption === option,
        ]),
      ),
    );
  };

  const handleOptionClick = (option: string) => {
    router.replace(
      // @ts-expect-error
      { pathname, params, query: { filter: option } },
      { scroll: false },
    );
    activateButton(option);
  };

  return {
    usedOptions,
    handleOptionClick,
  };
}
