DROP FUNCTION IF EXISTS get_internet_packages_by_address(
  text, text, integer[], integer[]
);

CREATE OR REPLACE FUNCTION get_internet_packages_by_address(
  p_oid TEXT,
  p_sort TEXT,
  p_provider_ids INTEGER[],
  p_technology_ids INTEGER[]
)
RETURNS TABLE (
  id SMALLINT,
  name TEXT,
  description TEXT,
  download_speed SMALLINT,
  upload_speed SMALLINT,
  data SMALLINT,
  price NUMERIC(10,2),
  technology TEXT,
  provider_name TEXT,
  provider_image_url TEXT,
  infrastructure_provider_name TEXT,
  is_infrastructure_provider_partner BOOLEAN,
  installation JSONB
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    ip.id,
    ip.name,
    ip.description,
    ip.download_speed,
    ip.upload_speed,
    ip.data,
    ip.price,
    tt.name AS technology,
    p.name AS provider_name,
    p.image_url AS provider_image_url,
    i.name AS infrastructure_provider_name,
    i.is_partner AS is_infrastructure_provider_partner,
    jsonb_build_object(
      'visit_fee', pi.visit_fee,
      'additional_time', pi.additional_time,
      'additional_time_fee', pi.additional_time_fee
    ) AS installation
  FROM addresses a
  INNER JOIN address_technologies at
    ON a.ads_oid = at.address_ads_oid
  INNER JOIN internet_packages ip
    ON (at.technology_id, at.provider_id, at.infrastructure_provider_id) =
        (ip.technology_id, ip.provider_id, ip.infrastructure_provider_id)
  INNER JOIN technologies t
    ON ip.technology_id = t.id
  INNER JOIN technology_types tt
    ON t.technology_type_id = tt.id
  INNER JOIN connection_types ct
    ON tt.connection_type_id = ct.id
  INNER JOIN providers p
    ON ip.provider_id = p.id
  LEFT JOIN infrastructure_providers i
    ON ip.infrastructure_provider_id = i.id
  INNER JOIN provider_installations pi
    ON pi.provider_id = p.id
  WHERE a.ads_oid = p_oid 
    AND (
      -- Case 1: both bounds are set to finite values
      (at.min_download_speed <> -1 AND at.max_download_speed <> -1 AND
      ip.download_speed BETWEEN at.min_download_speed AND at.max_download_speed)
      OR
      -- Case 2: minimum is set, maximum is infinite
      (at.min_download_speed <> -1 AND at.max_download_speed = -1 AND
      (ip.download_speed = -1 OR ip.download_speed >= at.min_download_speed))
      OR
      -- Case 4: both bounds are infinite (min=-1, max=-1)
      (at.min_download_speed = -1 AND at.max_download_speed = -1 AND
      ip.download_speed = -1)
    )
    AND (COALESCE(array_length(p_provider_ids, 1), 0) = 0 OR ip.provider_id = ANY(p_provider_ids))
    AND (COALESCE(array_length(p_technology_ids, 1), 0) = 0 OR tt.id = ANY(p_technology_ids))
  ORDER BY
    CASE 
      WHEN p_sort = 'speed_desc' THEN CASE WHEN ct.id = 1 THEN 1 ELSE 2 END
      ELSE 0
    END,
    CASE
      WHEN p_sort = 'speed_desc' THEN COALESCE(NULLIF(ip.download_speed, -1), 999999)
      ELSE 0
    END DESC,
    CASE 
      WHEN p_sort = 'price_asc' THEN ip.price
      ELSE NULL
    END ASC,
    CASE
      WHEN p_sort = 'price_desc' THEN ip.price
      ELSE NULL
    END DESC;
END;
$$;
