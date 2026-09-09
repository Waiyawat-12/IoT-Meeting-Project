# Bangkok Smart Flood Risk Prediction & Monitoring System

Interactive prototype for Bangkok’s **50 districts**. Rain chance and intensity drive a heuristic flood-risk score, painted onto real district polygons in Leaflet.

**Tagline:** เห็นน้ำท่วมก่อนน้ำมา — see the flood before the water arrives.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js App Router dashboard |
| `npm run build` | Production build |
| `npm test` | Flood-engine unit tests |
| `npm run lint` | ESLint |

## File structure

```
src/app/page.tsx                 Primary dashboard layout
src/app/architecture/page.tsx    System architecture SVG
src/app/api/risk/route.ts        GET ?rainChance=&rainIntensity=
src/components/dashboard/        Map, sliders, list, drawer
src/context/FloodContext.tsx     Shared simulation state
src/data/districtsData.ts        50 districts + vulnerability + pumps
src/lib/floodEngine.ts           RiskScore heuristic
src/lib/geojson.ts               Local file + GitHub fallback
public/bkk-districts.json        Bangkok-only GeoJSON (50 polygons)
firmware/drainage-station/       ESP32 Arduino sample
docs/schema.sql                  TimescaleDB + PostGIS
startup-build-template.md        Filled 5W1H startup canvas
```

## Primary page layout

1. **Header** — live Bangkok time, peak city risk.
2. **Left rail** — rain sliders, Sunny / Seasonal / Severe presets, city stats, heat-map legend.
3. **Center** — Leaflet map of 50 district polygons, colored by RiskScore.
4. **Right rail** — districts ranked by risk; search in Thai or English.
5. **Drawer** — click a district for TH/EN name, score breakdown, pump status, AI recommendation.

## Flood engine

```
RiskScore = min(100, round(
  RainChance * 0.35 +
  (RainIntensity / 120) * 100 * 0.45 +
  DistrictBaseVulnerability * 0.20
))
```

| Band | Score | Color |
| --- | --- | --- |
| Low | 0–29% | Emerald |
| Moderate | 30–59% | Amber |
| High | 60–79% | Orange |
| Critical | 80–100% | Rose |

Low-lying districts such as **Lat Phrao, Bang Khen, Don Mueang, Sai Mai, Watthana, Phra Khanong** carry a higher `baseVulnerability` than the historic inner city.

## Map data

The brief’s GitHub URL `https://raw.githubusercontent.com/apisit/thailand-geojson/master/bkk.json` returns **404**. This repo ships a Bangkok-only extract of [OpenGISData-Thailand](https://github.com/chingchai/OpenGISData-Thailand) at `/public/bkk-districts.json`, and will fall back to that project’s raw GeoJSON (filtered to `pro_code = 10`) if the local file is missing. Details: `docs/GEOJSON.md`.

The Leaflet basemap is Esri World Dark Gray canvas tiles (no API key). Carto’s public `dark_all` tiles currently watermark “API KEY REQUIRED”.

## API

`GET /api/risk?rainChance=95&rainIntensity=110` returns all 50 scored districts plus a city summary.
