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
  speed JSONB,
  data SMALLINT,
  price NUMERIC(10,2),
  technology JSONB,
  provider JSONB,
  installation JSONB,
  infrastructure JSONB,
  equipment JSONB,
  discount_campaigns JSONB
)
LANGUAGE plpgsql AS $$
BEGIN
  RETURN QUERY
  SELECT
    ip.id,
    ip.name,
    ip.description,
    jsonb_build_object(
        'download', ip.download_speed,
        'upload', ip.upload_speed
    ) AS speed,
    ip.data,
    ip.price,
    jsonb_build_object(
        'name', tt.name,
        'description', tt.description
    ) AS technology,
    jsonb_build_object(
        'name', p.name,
        'image_url', p.image_url
    ) AS provider,
    CASE 
        WHEN MAX(pi.provider_id) IS NULL THEN NULL
        ELSE jsonb_build_object(
            'visit_fee', MAX(pi.visit_fee),
            'additional_time', MAX(pi.additional_time),
            'additional_time_fee', MAX(pi.additional_time_fee)
        )
    END AS installation,
    jsonb_build_object(
        'name', i.name,
        'is_partner', i.is_partner
    ) AS infrastructure,
    
    COALESCE(eq.equipment, '[]'::jsonb) AS equipment,
    
    COALESCE(dc.discount_campaigns, '[]'::jsonb) AS discount_campaigns

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
    LEFT JOIN provider_installations pi
        ON pi.provider_id = p.id


    LEFT JOIN LATERAL (
        SELECT jsonb_agg(jsonb_build_object(
            'id', pe.id,
            'name', pe.name,
            'description', pe.description,
            'type', CASE WHEN pe.equipment_id IS NOT NULL THEN et_from_equipment.name ELSE et_from_provider.name END,
            'brand', CASE WHEN pe.equipment_id IS NOT NULL THEN e.brand ELSE NULL END,
            'model', CASE WHEN pe.equipment_id IS NOT NULL THEN e.model ELSE NULL END,
            'combination_id', ec.equipment_combination_id,
            'payment', pmt.payment
        ) ORDER BY CASE WHEN pe.equipment_id IS NOT NULL THEN et_from_equipment.name ELSE et_from_provider.name END) AS equipment
        FROM internet_package_equipment ec
        LEFT JOIN equipment_combination_items eci
            ON ec.equipment_combination_id = eci.equipment_combination_id
        LEFT JOIN provider_equipment pe
            ON eci.provider_equipment_id = pe.id
        LEFT JOIN equipment e
            ON pe.equipment_id = e.id
        LEFT JOIN equipment_types et_from_equipment
            ON e.equipment_type_id = et_from_equipment.id
        LEFT JOIN equipment_types et_from_provider
            ON pe.equipment_type_id = et_from_provider.id
        LEFT JOIN LATERAL (
            SELECT COALESCE(
                jsonb_object_agg(
                    po.name,
                    CASE 
                        WHEN po.name = 'installments' THEN jsonb_build_object('price', ep.price, 'installments_months', ep.installments_months)
                        ELSE jsonb_build_object('price', ep.price)
                    END
                ), '{}'::jsonb
            ) AS payment
            FROM equipment_payments ep
            LEFT JOIN payment_options po
                ON ep.payment_option_id = po.id
            WHERE ep.provider_equipment_id = pe.id
        ) pmt ON true
        WHERE ec.package_id = ip.id
    ) eq ON true


    LEFT JOIN LATERAL (
        SELECT jsonb_agg(jsonb_build_object(
            'code', dc.code,
            'name', dc.name,
            'description', dc.description
        )) AS discount_campaigns
        FROM internet_package_discount_campaigns ipdc
        JOIN discount_campaigns dc
            ON dc.id = ipdc.discount_campaign_id
        WHERE ipdc.package_id = ip.id
          AND dc.is_active = true
    ) dc ON true

  WHERE a.ads_oid = p_oid
    AND (
      (at.min_download_speed <> -1 AND at.max_download_speed <> -1 AND
       ip.download_speed BETWEEN at.min_download_speed AND at.max_download_speed)
      OR
      (at.min_download_speed <> -1 AND at.max_download_speed = -1 AND
       (ip.download_speed = -1 OR ip.download_speed >= at.min_download_speed))
      OR
      (at.min_download_speed = -1 AND at.max_download_speed = -1 AND ip.download_speed = -1)
    )
    AND (COALESCE(array_length(p_provider_ids, 1), 0) = 0 OR ip.provider_id = ANY(p_provider_ids))
    AND (COALESCE(array_length(p_technology_ids, 1), 0) = 0 OR tt.id = ANY(p_technology_ids))

  GROUP BY
    ip.id, ip.name, ip.description, ip.download_speed, ip.upload_speed, ip.data, ip.price,
    tt.name, tt.description,
    p.name, p.image_url,
    i.name, i.is_partner,
    eq.equipment,
    dc.discount_campaigns

  ORDER BY
    CASE 
        WHEN p_sort = 'speed_desc' THEN CASE WHEN MAX(ct.id) = 1 THEN 1 ELSE 2 END
        ELSE 0
    END,
    CASE
        WHEN p_sort = 'speed_desc' THEN COALESCE(NULLIF(ip.download_speed, -1), 999999)
    END DESC,
    CASE 
        WHEN p_sort = 'price_asc' THEN ip.price
    END ASC,
    CASE
        WHEN p_sort = 'price_desc' THEN ip.price
    END DESC;
END;
$$;
