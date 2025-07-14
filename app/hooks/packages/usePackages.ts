import { getPackages } from '@/lib/packagesDataFetch';
import { PackageAction } from '@/types/elements.types';
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

  const [selectedPackage, setSelectedPackage] = useState<{
    [key: string]: any;
  } | null>(null);

  const [selectedAction, setSelectedAction] =
    useState<PackageAction>('connection');

  const handleActionClick = (
    packageData: { [key: string]: any },
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
