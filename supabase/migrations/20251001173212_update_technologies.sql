ALTER TABLE technologies
DROP COLUMN IF EXISTS abr,
DROP COLUMN IF EXISTS priority,
DROP COLUMN IF EXISTS max_speed;

ALTER TABLE technologies
ALTER COLUMN name SET NOT NULL;

ALTER TABLE technologies
RENAME COLUMN technology_type TO technology_type_id;

ALTER TABLE technologies
DROP CONSTRAINT IF EXISTS technology_type_abr_max_speed;

ALTER TABLE technologies
ADD CONSTRAINT technologies_name_key UNIQUE (name);

ALTER TABLE technologies
DROP CONSTRAINT IF EXISTS technologies_technology_type_fkey,
ADD CONSTRAINT technologies_technology_type_fkey
FOREIGN KEY (technology_type_id)
REFERENCES technology_types (id)
ON DELETE CASCADE;