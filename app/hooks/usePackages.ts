import { getPackages } from '@/lib/packagesDataFetch';
import { useState } from 'react';
import useSWR from 'swr';

export default function usePackages(
  oid: string,
  initialPackages: { [key: string]: any }[],
  sortOption: string,
  providers: string[],
  technologies: string[],
) {
  const {
    data: packages,
    error,
    isLoading,
  } = useSWR(
    [oid, sortOption, providers, technologies],
    () => getPackages(oid, sortOption, providers, technologies),
    {
      fallbackData: initialPackages,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateIfStale: true,
      errorRetryCount: 0,
      errorRetryInterval: 2000,
    },
  );
  const [selectedPackage, setSelectedPackage] = useState<{ [key: string]: any } | null>(null);
  const [requestType, setRequestType] = useState<'connection' | 'consultation'>('connection');

  const handleActionClick = (
    packageData: { [key: string]: any },
    action: 'connection' | 'consultation',
    handleModal: () => void,
  ) => {
    setSelectedPackage(packageData);
    setRequestType(action);
    handleModal();
  };

  return {
    packages,
    error,
    isLoading,
    selectedPackage,
    requestType,
    handleActionClick,
  };
}
