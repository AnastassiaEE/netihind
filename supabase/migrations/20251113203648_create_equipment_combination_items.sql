CREATE TABLE IF NOT EXISTS equipment_combination_items (
  equipment_combination_id SMALLINT NOT NULL REFERENCES equipment_combinations(id) ON DELETE CASCADE,
  provider_equipment_id SMALLINT NOT NULL REFERENCES provider_equipment(id) ON DELETE CASCADE,
  CONSTRAINT equipment_combination_items_pkey PRIMARY KEY (equipment_combination_id, provider_equipment_id)
) TABLESPACE pg_default;

ALTER TABLE equipment_combination_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipment Combination Items is viewable by everyone"
ON equipment_combination_items
FOR SELECT
TO anon, authenticated
USING (true);   