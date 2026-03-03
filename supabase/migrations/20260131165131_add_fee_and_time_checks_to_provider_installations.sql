ALTER TABLE provider_installations ADD CONSTRAINT provider_installations_visit_fee_non_negative_check CHECK (visit_fee >= 0);

ALTER TABLE provider_installations ADD CONSTRAINT provider_installations_additional_time_positive_check CHECK (
  additional_time IS NULL
  OR additional_time > 0
);

ALTER TABLE provider_installations ADD CONSTRAINT provider_installations_additional_time_fee_non_negative_check CHECK (
  additional_time_fee IS NULL
  OR additional_time_fee >= 0
);
