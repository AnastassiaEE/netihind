ALTER TABLE technology_types
DROP CONSTRAINT IF EXISTS service_id_name;

ALTER TABLE technology_types
DROP CONSTRAINT IF EXISTS technology_types_connection_type_id_fkey,
ADD CONSTRAINT technology_types_connection_type_id_fkey
FOREIGN KEY (connection_type_id) REFERENCES connection_types (id) ON DELETE CASCADE;

ALTER TABLE technology_types
DROP CONSTRAINT IF EXISTS technology_types_service_id_fkey,
ADD CONSTRAINT technology_types_service_id_fkey
FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE CASCADE;

ALTER TABLE technology_types
ADD CONSTRAINT technology_types_name_key UNIQUE (name);

ALTER TABLE technology_types
ALTER COLUMN connection_type_id SET NOT NULL;

ALTER TABLE technology_types
RENAME CONSTRAINT "Typetechnology_pkey" TO "technology_types_pkey";