import { getPackages } from '@/lib/packagesDataFetch';
import { Package, PackageAction } from '@/types/packages.types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

/**
 * Fetches internet packages for a given address and manages related UI state.
 *
 * This hook retrieves packages based on sorting and filtering options,
 * handles loading and error states via SWR, and manages the currently
 * selected package and user action (e.g. connection).
 *
 * @param oid - Address identifier used to fetch available packages
 * @param sortOption - Current sorting option (e.g. by price or speed)
 * @param providers - List of selected internet providers
 * @param technologies - List of selected connection technologies
 * @param onLoaded - Optional callback triggered once data is loaded or an error occurs
 *
 * @returns An object containing:
 *  - `packages`: array of fetched packages (`Package[]`) or `undefined` while loading
 *  - `error`: error object if fetching fails (`unknown`)
 *  - `isLoading`: boolean indicating whether packages are currently loading
 *  - `selectedPackage`: the currently selected package (`Package` | `undefined`)
 *  - `selectedAction`: the currently selected action for the package (`PackageAction`)
 *  - `handleActionClick`: function to select a package and trigger its modal
 */
export default function usePackages(
  oid: string,
  sortOption: string,
  providers: string[],
  technologies: string[],
  onLoaded?: () => void,
) {
  const {
    data: packages,
    error,
    isLoading,
  } = useSWR(
    [oid, sortOption, providers, technologies],
    () => getPackages(oid, sortOption, providers, technologies),
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      errorRetryCount: 0,
    },
  );

  const [selectedPackage, setSelectedPackage] = useState<Package | undefined>(
    undefined,
  );

  const [selectedAction, setSelectedAction] =
    useState<PackageAction>('connection');

  /**
   * Sets the selected package and action, then opens the corresponding modal.
   *
   * @param packageData - The package object that was clicked/selected
   * @param action - The action to perform on the selected package (e.g., 'connection', 'consultation', etc.)
   * @param handleModal - Callback function that opens the modal associated with the action
   */
  const handleActionClick = (
    packageData: Package,
    action: PackageAction,
    handleModal: () => void,
  ) => {
    setSelectedPackage(packageData);
    setSelectedAction(action);
    handleModal();
  };

  /**
   * Call optional callback once packages are loaded or an error occurs.
   */
  useEffect(() => {
    if (!isLoading && (packages || error)) {
      onLoaded?.();
    }
  }, [isLoading, packages, error]);

  return {
    packages,
    error,
    isLoading,
    selectedPackage,
    selectedAction,
    handleActionClick,
  };
}
