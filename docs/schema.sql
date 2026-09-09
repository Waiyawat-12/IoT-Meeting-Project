-- Bangkok Smart Flood Risk — cloud schema (PostgreSQL + TimescaleDB + PostGIS)
-- Prototype target. The dashboard currently uses mock TypeScript datasets.

CREATE EXTENSION IF NOT EXISTS timescaledb;
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE districts (
  id            TEXT PRIMARY KEY,          -- TH1001 … TH1050
  code          INTEGER UNIQUE NOT NULL,
  name_th       TEXT NOT NULL,
  name_en       TEXT NOT NULL,
  zone          TEXT NOT NULL,
  area_sqkm     NUMERIC(8,2) NOT NULL,
  base_vulnerability SMALLINT NOT NULL CHECK (base_vulnerability BETWEEN 0 AND 100),
  pumps_total   SMALLINT NOT NULL,
  centroid      geometry(Point, 4326) NOT NULL,
  boundary      geometry(MultiPolygon, 4326) NOT NULL
);

CREATE TABLE drainage_stations (
  station_id    TEXT PRIMARY KEY,
  district_id   TEXT NOT NULL REFERENCES districts(id),
  name          TEXT NOT NULL,
  location      geometry(Point, 4326) NOT NULL,
  pump_capacity_cms NUMERIC(8,3)
);

CREATE TABLE telemetry (
  time          TIMESTAMPTZ NOT NULL,
  station_id    TEXT NOT NULL REFERENCES drainage_stations(station_id),
  rain_mm_hr    NUMERIC(8,2),
  water_level_cm NUMERIC(8,2),
  pump_on       BOOLEAN,
  current_raw   INTEGER,
  rssi          INTEGER
);

SELECT create_hypertable('telemetry', 'time');

CREATE TABLE risk_snapshots (
  time          TIMESTAMPTZ NOT NULL,
  district_id   TEXT NOT NULL REFERENCES districts(id),
  rain_chance   NUMERIC(5,2),
  rain_intensity NUMERIC(6,2),
  risk_score    SMALLINT NOT NULL CHECK (risk_score BETWEEN 0 AND 100),
  recommendation TEXT NOT NULL,
  PRIMARY KEY (time, district_id)
);

SELECT create_hypertable('risk_snapshots', 'time');

CREATE INDEX ON telemetry (station_id, time DESC);
CREATE INDEX ON risk_snapshots (district_id, time DESC);
