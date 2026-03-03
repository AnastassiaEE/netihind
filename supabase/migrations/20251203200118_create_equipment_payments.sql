CREATE TABLE IF NOT EXISTS equipment_payments (
  provider_equipment_id SMALLINT NOT NULL REFERENCES provider_equipment (id) ON DELETE CASCADE,
  payment_option_id SMALLINT NOT NULL REFERENCES payment_options (id) ON DELETE CASCADE,
  installments_months SMALLINT,
  price NUMERIC(10, 2) NOT NULL,
  PRIMARY KEY (provider_equipment_id, payment_option_id),
  CONSTRAINT installments_months_valid CHECK (
    (
      payment_option_id = 2
      AND installments_months IS NOT NULL
    )
    OR (
      payment_option_id <> 2
      AND installments_months IS NULL
    )
  )
) TABLESPACE pg_default;

ALTER TABLE equipment_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipment Payments are viewable by everyone" ON equipment_payments FOR
SELECT
  TO anon,
  authenticated USING (true);
