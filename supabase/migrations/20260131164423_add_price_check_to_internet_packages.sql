ALTER TABLE internet_packages ADD CONSTRAINT internet_packages_price_non_negative_check CHECK (price >= 0);
