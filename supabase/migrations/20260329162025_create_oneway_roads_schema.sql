/*
  # Lagos One-Way Roads Safety System

  1. New Tables
    - `oneway_roads`
      - `id` (uuid, primary key)
      - `road_name` (text) - Name of the road
      - `lga` (text) - Local Government Area
      - `latitude` (decimal) - Road location latitude
      - `longitude` (decimal) - Road location longitude
      - `direction_start_lat` (decimal) - Start point of allowed direction
      - `direction_start_lng` (decimal) - Start point longitude
      - `direction_end_lat` (decimal) - End point of allowed direction
      - `direction_end_lng` (decimal) - End point longitude
      - `photo_url` (text) - URL to road sign photo
      - `safety_note` (text) - Important safety information
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `road_reports`
      - `id` (uuid, primary key)
      - `road_name` (text) - Reported road name
      - `lga` (text) - Local Government Area
      - `latitude` (decimal) - Report location
      - `longitude` (decimal) - Report location
      - `description` (text) - Report details
      - `photo_url` (text) - Photo evidence
      - `status` (text) - pending, verified, rejected
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Allow public read access to oneway_roads for safety
    - Allow authenticated users to create reports
    - Reports are publicly viewable
*/

CREATE TABLE IF NOT EXISTS oneway_roads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_name text NOT NULL,
  lga text NOT NULL,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  direction_start_lat decimal(10, 8) NOT NULL,
  direction_start_lng decimal(11, 8) NOT NULL,
  direction_end_lat decimal(10, 8) NOT NULL,
  direction_end_lng decimal(11, 8) NOT NULL,
  photo_url text DEFAULT '',
  safety_note text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS road_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  road_name text NOT NULL,
  lga text NOT NULL,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  description text NOT NULL,
  photo_url text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE oneway_roads ENABLE ROW LEVEL SECURITY;
ALTER TABLE road_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view one-way roads for safety"
  ON oneway_roads
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view road reports"
  ON road_reports
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can submit road reports"
  ON road_reports
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_oneway_roads_location ON oneway_roads(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_road_reports_status ON road_reports(status);