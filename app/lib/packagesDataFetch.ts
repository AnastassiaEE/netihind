import { supabase } from '@/lib/supabase';

export const getProviders = async (oid: string) => {
  let { data: providers, error: providersError } = await supabase.rpc('get_providers_by_address', {
    p_oid: oid,
  });
  if (providersError) throw new Error('somethingWentWrong');
  return providers;
};

export const getPackages = async (
  filter: string,
  city: string,
  county: string,
  street: string,
  streetNr: string,
) => {
  const { data: packages, error: packagesError } = await supabase.rpc(
    'get_internet_packages_by_address',
    {
      p_filter: filter,
      p_city: city,
      p_maakond: county,
      p_street: `${street} ${streetNr}`,
    },
  );
  if (packagesError) throw new Error('somethingWentWrong');
  return packages;
};
