CREATE TABLE IF NOT EXISTS internet_package_discount_campaigns (
  package_id SMALLINT NOT NULL REFERENCES internet_packages (id) ON DELETE CASCADE,
  discount_campaign_id SMALLINT NOT NULL REFERENCES discount_campaigns (id) ON DELETE CASCADE,
  CONSTRAINT internet_package_discount_campaigns_pkey PRIMARY KEY (package_id, discount_campaign_id)
);

ALTER TABLE internet_package_discount_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Internet Package Discount Campaigns are viewable by everyone" ON internet_package_discount_campaigns FOR
SELECT
  TO anon,
  authenticated USING (true);
