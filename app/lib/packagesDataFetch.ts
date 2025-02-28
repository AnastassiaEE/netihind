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

export const getPackages = async (oid: string, sort: string) => {
  const { data: packages, error: packagesError } = await supabase.rpc('get_packages_by_address', {
    p_oid: oid,
    p_sort: sort,
  });
  if (packagesError) throw new Error('Errors.somethingWentWrong');
  if (!packages || packages.length === 0) throw new Error('Errors.noPackages');
  return packages;
};
