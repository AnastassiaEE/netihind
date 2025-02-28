import { getPackages } from '@/lib/packagesDataFetch';
import useSWR from 'swr';

export default function usePackages(
  oid: string,
  initialPackages: { [key: string]: any }[],
  sortOption: string,
  providers: string[],
) {
  const {
    data: packages,
    error,
    isLoading,
  } = useSWR([oid, sortOption, providers], () => getPackages(oid, sortOption, providers), {
    fallbackData: initialPackages,
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateIfStale: true,
    errorRetryCount: 3,
    errorRetryInterval: 2000,
  });
  return {
    packages,
    error,
    isLoading,
  };
}
