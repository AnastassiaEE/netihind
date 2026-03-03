DROP FUNCTION IF EXISTS get_technologies_by_address(text);

CREATE FUNCTION public.get_technologies_by_address(p_oid text)
RETURNS TABLE(id smallint, name text)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT technology_types.id, technology_types.name
    FROM addresses
    INNER JOIN address_technologies
      ON addresses.ads_oid = address_technologies.address_ads_oid
    INNER JOIN technologies
      ON address_technologies.technology_id = technologies.id
    INNER JOIN technology_types
      ON technologies.technology_type_id = technology_types.id
    WHERE addresses.ads_oid = p_oid
    ORDER BY technology_types.id;
END;
$$;