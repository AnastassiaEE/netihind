ALTER TABLE provider_installations
DROP CONSTRAINT provider_installations_pkey;

ALTER TABLE provider_installations
DROP CONSTRAINT provider_installations_provider_id_key;

ALTER TABLE provider_installations
DROP COLUMN id;

ALTER TABLE provider_installations ADD CONSTRAINT provider_installations_pkey PRIMARY KEY (provider_id);
