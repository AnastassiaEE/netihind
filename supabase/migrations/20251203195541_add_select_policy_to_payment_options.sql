ALTER TABLE payment_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Payment Options are viewable by everyone" ON payment_options FOR
SELECT
  TO anon,
  authenticated USING (true);
