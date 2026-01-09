/*
  # Add DELETE policy for appointments

  1. Security
    - Add policy allowing anyone to delete appointments
*/

CREATE POLICY "Anyone can delete appointments"
  ON appointments FOR DELETE
  TO anon, authenticated
  USING (true);