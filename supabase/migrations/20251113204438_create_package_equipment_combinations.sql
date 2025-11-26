CREATE TABLE IF NOT EXISTS internet_package_equipment_combinations (
  package_id SMALLINT NOT NULL REFERENCES internet_packages(id) ON DELETE CASCADE,
  equipment_combination_id SMALLINT NOT NULL REFERENCES equipment_combinations(id) ON DELETE CASCADE,
  CONSTRAINT package_equipment_combinations_pkey PRIMARY KEY (package_id, equipment_combination_id)
) TABLESPACE pg_default;


ALTER TABLE internet_package_equipment_combinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Internet Package Equipment Combinations are viewable by everyone"
ON internet_package_equipment_combinations
FOR SELECT
TO anon, authenticated
USING (true);   