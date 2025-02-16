import { supabase } from '@/lib/supabase';

export const getProviders = async (oid: string) => {
  let { data: providers, error: providersError } = await supabase.rpc('get_providers_by_address', {
    p_oid: oid,
  });
  if (providersError) return [];
  return providers || [];
};

export const getTechnologies = async (oid: string) => {
  let { data: technologies, error: technologiesError } = await supabase.rpc(
    'get_technologies_by_address',
    {
      p_oid: oid,
    },
  );
  if (technologiesError) return [];
  return technologies || [];
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
