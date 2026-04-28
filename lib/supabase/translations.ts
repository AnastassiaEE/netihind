import { supabase } from '@/lib/supabase/client';

export const getStringTranslations = async () => {
  const { data: stringTranslations } = await supabase.rpc(
    'get_string_translations',
  );
  return stringTranslations ?? [];
};
