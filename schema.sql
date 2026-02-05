-- Run this in your Supabase SQL Editor

CREATE TABLE qr_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  title VARCHAR(255),
  admin_token VARCHAR(32) NOT NULL,
  scan_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE scans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID REFERENCES qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  country VARCHAR(100),
  city VARCHAR(100),
  device_type VARCHAR(50)
);

CREATE INDEX idx_qr_codes_short_code ON qr_codes(short_code);
CREATE INDEX idx_qr_codes_admin_token ON qr_codes(admin_token);
CREATE INDEX idx_scans_qr_code_id ON scans(qr_code_id);
CREATE INDEX idx_scans_scanned_at ON scans(scanned_at);

-- Row Level Security (allow all for now, lock down later with auth)
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all qr_codes operations" ON qr_codes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all scans operations" ON scans FOR ALL USING (true) WITH CHECK (true);
