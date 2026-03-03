CREATE TABLE IF NOT EXISTS internet_package_discounts (
  package_id SMALLINT NOT NULL REFERENCES internet_packages (id) ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  duration SMALLINT,
  CONSTRAINT internet_package_discounts_pkey PRIMARY KEY (package_id)
);

ALTER TABLE internet_package_discounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Internet Package Discounts are viewable by everyone" ON internet_package_discounts FOR
SELECT
  TO anon,
  authenticated USING (true);
