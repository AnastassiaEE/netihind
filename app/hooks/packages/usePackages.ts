import { getPackages } from '@/lib/packagesDataFetch';
import { Package, PackageAction } from '@/types/packages.types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

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

  console.log(packages);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const [selectedAction, setSelectedAction] =
    useState<PackageAction>('connection');

  const handleActionClick = (
    packageData: Package,
    action: PackageAction,
    handleModal: () => void,
  ) => {
    setSelectedPackage(packageData);
    setSelectedAction(action);
    handleModal();
  };

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
