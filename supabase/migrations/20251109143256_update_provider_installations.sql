ALTER TABLE provider_installations
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS min_price;

ALTER TABLE provider_installations
  RENAME CONSTRAINT provider_connections_pkey TO provider_installations_pkey;

ALTER TABLE provider_installations
  RENAME CONSTRAINT provider_connections_provider_id_key TO provider_installations_provider_id_key;

ALTER TABLE provider_installations
  DROP CONSTRAINT IF EXISTS provider_connections_provider_id_fkey,
  ADD CONSTRAINT provider_installations_provider_id_fkey
    FOREIGN KEY (provider_id)
    REFERENCES providers (id)
    ON DELETE CASCADE;

ALTER TABLE provider_installations
  ADD COLUMN visit_fee numeric(10,2) NOT NULL,
  ADD COLUMN additional_time smallint NULL,
  ADD COLUMN additional_time_fee numeric(10,2) NULL;