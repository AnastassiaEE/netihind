CREATE POLICY "Connection Types are viewable by everyone"
ON connection_types
FOR SELECT
TO anon, authenticated
USING (true);