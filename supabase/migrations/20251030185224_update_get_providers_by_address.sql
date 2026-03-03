DROP FUNCTION IF EXISTS get_providers_by_address(text);

CREATE FUNCTION get_providers_by_address(p_oid text)
RETURNS TABLE(id smallint, name text)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT providers.id, providers.name
    FROM addresses
    INNER JOIN address_technologies
      ON addresses.ads_oid = address_technologies.address_ads_oid
    INNER JOIN providers
      ON address_technologies.provider_id = providers.id
    WHERE addresses.ads_oid = p_oid
    ORDER BY providers.id;
END;
$$;