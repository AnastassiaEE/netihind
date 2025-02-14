import { getPackages } from '@/lib/packagesDataFetch';
import useSWR from 'swr';

export default function usePackages(
  initialPackages: { [key: string]: any }[],
  filter: string,
  city: string,
  county: string,
  street: string,
  streetNr: string,
) {
  const {
    data: packages,
    error,
    isLoading,
  } = useSWR(
    [filter, city, county, street, streetNr],
    () => getPackages(filter, city, county, street, streetNr),
    {
      fallbackData: initialPackages,
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateIfStale: true,
      errorRetryCount: 3,
      errorRetryInterval: 2000,
    },
  );

  return {
    packages,
    error,
    isLoading,
  };
}
