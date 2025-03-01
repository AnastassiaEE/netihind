import { supabase } from '@/lib/supabase';

export const getProviders = async (oid: string) => {
  let { data: providers, error: providersError } = await supabase.rpc('get_providers_by_address', {
    p_oid: oid,
  });
  return providers ?? [];
};

export const getTechnologies = async (oid: string) => {
  let { data: technologies, error: technologiesError } = await supabase.rpc(
    'get_technologies_by_address',
    {
      p_oid: oid,
    },
  );
  return technologies ?? [];
};

export const getPackages = async (
  oid: string,
  sort: string,
  providers: string[],
  technologies: string[],
) => {
  const { data: packages, error: packagesError } = await supabase.rpc('get_packages_by_address', {
    p_oid: oid,
    p_sort: sort,
    p_provider_ids: providers,
    p_technology_ids: technologies,
  });
  if (packagesError) throw new Error('errors.somethingWentWrong');
  if (!packages || packages.length === 0) throw new Error('errors.noPackages');
  return packages;
};
