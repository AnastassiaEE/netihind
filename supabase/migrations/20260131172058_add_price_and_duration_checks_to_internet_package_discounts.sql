ALTER TABLE internet_package_discounts ADD CONSTRAINT internet_package_discounts_price_non_negative_check CHECK (price >= 0);

ALTER TABLE internet_package_discounts ADD CONSTRAINT internet_package_discounts_duration_positive_check CHECK (
  duration IS NULL
  OR duration > 0
);
