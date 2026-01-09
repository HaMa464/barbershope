/*
  # Barber Shop Booking System Schema

  1. New Tables
    - `barbers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
    
    - `services`
      - `id` (uuid, primary key)
      - `name` (text)
      - `name_ku` (text) - Kurdish name
      - `name_ar` (text) - Arabic name
      - `price` (integer) - in IQD
      - `created_at` (timestamp)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `barber_id` (uuid, foreign key)
      - `service_id` (uuid, foreign key)
      - `customer_name` (text, optional)
      - `appointment_date` (date)
      - `appointment_time` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (booking system is public)
    - Add policies for public insert on appointments

  3. Initial Data
    - Insert two barbers: Omer and Ali
    - Insert two services: Beard Trim (5,000 IQD) and Hair + Beard (10,000 IQD)
*/

-- Create barbers table
CREATE TABLE IF NOT EXISTS barbers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_ku text NOT NULL,
  name_ar text NOT NULL,
  price integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  barber_id uuid NOT NULL REFERENCES barbers(id),
  service_id uuid NOT NULL REFERENCES services(id),
  customer_name text DEFAULT '',
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies for barbers (public read)
CREATE POLICY "Anyone can view barbers"
  ON barbers FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for services (public read)
CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policies for appointments (public read and insert)
CREATE POLICY "Anyone can view appointments"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Insert initial barbers
INSERT INTO barbers (name, active) VALUES
  ('Omer', true),
  ('Ali', true)
ON CONFLICT DO NOTHING;

-- Insert initial services
INSERT INTO services (name, name_ku, name_ar, price) VALUES
  ('Beard Trim', 'سەقاڵ کردن', 'تشذيب اللحية', 5000),
  ('Hair + Beard', 'قژ + سەقاڵ', 'شعر + لحية', 10000)
ON CONFLICT DO NOTHING;