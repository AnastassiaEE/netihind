import { usePathname, useRouter } from '@/i18n/routing';
import { useParams, useSearchParams } from 'next/navigation';

/**
 * Manages sorting option state and synchronizes it with the URL query parameters.
 *
 * This hook allows changing the currently selected sort option and updates
 * the browser URL without causing a page reload. It also triggers an optional
 * callback when the user changes the sort option.
 *
 * @param selectedOption - Currently selected sorting option
 * @param setSelectedOption - State setter for the selected option
 * @param onUserChange - Optional callback triggered when the user changes the sort
 *
 * @returns An object containing:
 *  - handleChange: function to update the sort option and URL
 */
export default function useSort(
  selectedOption: string,
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>,
  onUserChange?: () => void,
) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  /**
   * Updates the selected sort option and the URL query parameters.
   * Skips the update if the new option is the same as the current one.
   */
  const handleChange = (name: string, option: string) => {
    if (option === selectedOption) return;
    onUserChange?.();
    setSelectedOption(option);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', option);
    const searchParamsObject = Object.fromEntries(newSearchParams.entries());
    router.replace(
      // Combine pathname + params + updated query for i18n routing
      // @ts-expect-error
      { pathname, params, query: searchParamsObject },
      { scroll: false },
    );
  };

  return {
    handleChange,
  };
}
