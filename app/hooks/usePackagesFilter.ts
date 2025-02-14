import { getProviders } from '@/lib/packagesDataFetch';
import { getProviderOptions } from '@/utils/packagesHelper';
import useSWRImmutable from 'swr/immutable';

export default function usePackagesFilter(addressId: string, selectedProviderParams: string[]) {
  const {
    data: providers = [],
    error: providersError,
    isLoading: isProvidersLoading,
  } = useSWRImmutable(addressId, getProviders);

  const providerOptions = getProviderOptions(providers);
  const selectedProviderOptions = providerOptions.filter(({ label }) =>
    selectedProviderParams.some((param) => param.toLowerCase() === label.toLowerCase()),
  );

  return {
    providers,
    providersError,
    isProvidersLoading,
    providerOptions,
    selectedProviderOptions,
  };
}
