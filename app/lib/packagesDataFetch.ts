import { supabase } from '@/lib/supabase';

/**
 * Fetches the list of internet providers available for a given address.
 *
 * Calls the `get_providers_by_address` Supabase RPC function.
 *
 * @param oid - The unique identifier of the address
 * @returns An array of provider objects, or an empty array if none are found
 */
export const getProviders = async (oid: string) => {
  let { data: providers, error: providersError } = await supabase.rpc(
    'get_providers_by_address',
    {
      p_oid: oid,
    },
  );
  return providers ?? [];
};

/**
 * Fetches the list of connection technologies available for a given address.
 *
 * Calls the `get_technologies_by_address` Supabase RPC function.
 *
 * @param oid - The unique identifier of the address
 * @returns An array of technology objects, or an empty array if none are found
 */
export const getTechnologies = async (oid: string) => {
  let { data: technologies, error: technologiesError } = await supabase.rpc(
    'get_technologies_by_address',
    {
      p_oid: oid,
    },
  );
  return technologies ?? [];
};

/**
 * Fetches internet packages available for a given address, filtered by providers
 * and technologies, and sorted according to the specified option.
 *
 * Calls the `get_internet_packages_by_address` Supabase RPC function.
 *
 * @param oid - The unique identifier of the address
 * @param sort - Sorting option (e.g., 'price_asc', 'speed_desc')
 * @param providers - Array of provider IDs to filter packages
 * @param technologies - Array of technology IDs to filter packages
 *
 * @throws Will throw an error if the RPC returns an error or if no packages are found
 * @returns An array of internet package objects
 */
export const getPackages = async (
  oid: string,
  sort: string,
  providers: string[],
  technologies: string[],
) => {

  const { data: packages, error: packagesError } = await supabase.rpc(
    'get_internet_packages_by_address',
    {
      p_oid: oid,
      p_sort: sort,
      p_provider_ids: providers,
      p_technology_ids: technologies,
    },
  );
  if (packagesError) throw new Error('errors.somethingWentWrong');
  if (!packages || packages.length === 0) throw new Error('errors.noPackages');
  return packages;
};

export const getStringTranslations = async () => {
  const { data: stringTranslations, error } = await supabase.rpc(
    'get_string_translations',
  );
  return stringTranslations ?? [];
};
