ALTER TABLE provider_installations ADD CONSTRAINT provider_installations_additional_time_and_fee_check CHECK (
  (
    additional_time IS NULL
    AND additional_time_fee IS NULL
  )
  OR (
    additional_time IS NOT NULL
    AND additional_time_fee IS NOT NULL
  )
);
