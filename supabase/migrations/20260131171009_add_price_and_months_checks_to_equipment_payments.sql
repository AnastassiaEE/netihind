ALTER TABLE equipment_payments ADD CONSTRAINT equipment_payments_price_non_negative_check CHECK (price >= 0);

ALTER TABLE equipment_payments ADD CONSTRAINT equipment_payments_installments_months_positive_check CHECK (
  installments_months IS NULL
  OR installments_months > 0
);
