# Bangkok 50-district GeoJSON

File: `/public/bkk-districts.json`

Source: [chingchai/OpenGISData-Thailand](https://github.com/chingchai/OpenGISData-Thailand) `districts.geojson`, filtered to Bangkok (`pro_code = "10"`), coordinates rounded to 5 decimals.

The original URL requested in the brief (`https://raw.githubusercontent.com/apisit/thailand-geojson/master/bkk.json`) currently returns HTTP 404. The dashboard therefore:

1. Loads the local Bangkok-only file first.
2. Falls back to the OpenGISData-Thailand GitHub raw / jsDelivr copy and filters to the 50 Bangkok districts.

Property fields after normalize: `id` (TH1001–TH1050), `nameTH`, `nameEN`, `districtCode`, `centroid`, `areaSqKm`.
