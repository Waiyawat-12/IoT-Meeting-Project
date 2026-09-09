"use client";

import type { Feature, FeatureCollection, Geometry } from "geojson";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useFlood } from "@/context/FloodContext";
import { getRiskColor } from "@/lib/floodEngine";
import { loadBangkokGeoJSON } from "@/lib/geojson";
import "leaflet/dist/leaflet.css";

const BANGKOK_CENTER: [number, number] = [13.7563, 100.5018];
const BANGKOK_BOUNDS = L.latLngBounds(
  [13.48, 100.32],
  [13.96, 100.94],
);

export default function BangkokMapInner() {
  const { rankedDistricts, selectedId, selectDistrict, weather } = useFlood();
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scoreById = useMemo(() => {
    const map = new Map<string, { score: number; nameTH: string; nameEN: string }>();
    for (const district of rankedDistricts) {
      map.set(district.id, {
        score: district.riskScore,
        nameTH: district.nameTH,
        nameEN: district.nameEN,
      });
    }
    return map;
  }, [rankedDistricts]);

  useEffect(() => {
    let cancelled = false;
    loadBangkokGeoJSON()
      .then((data) => {
        if (!cancelled) setGeojson(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Map failed to load");
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const styleFeature = (feature?: Feature<Geometry, { id?: string }>) => {
    const id = feature?.properties?.id ?? "";
    const score = scoreById.get(id)?.score ?? 0;
    const selected = id === selectedId;
    const color = getRiskColor(score);
    return {
      color: selected ? "#f8fafc" : "rgba(8, 15, 28, 0.85)",
      weight: selected ? 2.6 : 1,
      fillColor: color,
      fillOpacity: selected ? 0.86 : 0.72,
    };
  };

  const onEachFeature = (feature: Feature<Geometry, { id?: string }>, layer: L.Layer) => {
    const id = feature.properties?.id ?? "";
    const info = scoreById.get(id);
    const tooltip = info
      ? `<div class="bkk-tip"><strong>${info.nameEN}</strong><span>${info.nameTH}</span><em>${info.score}%</em></div>`
      : id;

    layer.bindTooltip(tooltip, {
      sticky: true,
      direction: "top",
      opacity: 1,
      className: "bkk-leaflet-tooltip",
    });

    layer.on({
      click: () => selectDistrict(id),
      mouseover: (event) => {
        const target = event.target as L.Path;
        target.setStyle({ weight: 2.4, fillOpacity: 0.9 });
        target.bringToFront();
      },
      mouseout: (event) => {
        const target = event.target as L.Path;
        target.setStyle(styleFeature(feature));
      },
    });
  };

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10">
      {error ? (
        <div className="flex h-full items-center justify-center bg-slate-950 text-sm text-rose-200">
          {error}
        </div>
      ) : null}
      <MapContainer
        center={BANGKOK_CENTER}
        zoom={11}
        minZoom={10}
        maxZoom={15}
        maxBounds={BANGKOK_BOUNDS}
        maxBoundsViscosity={0.8}
        zoomControl={false}
        className="h-full w-full bg-[#07111c]"
        style={{ background: "#07111c" }}
      >
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Esri, TomTom, Garmin, FAO, NOAA, USGS'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <ZoomControl position="bottomright" />
        {geojson ? (
          <GeoJSON
            key={`${weather.rainChance}-${weather.rainIntensity}-${selectedId}-${geojson.features.length}`}
            data={geojson}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        ) : null}
      </MapContainer>
      {!geojson && !error ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-950/40 text-sm text-cyan-100">
          Loading Bangkok district boundaries…
        </div>
      ) : null}
    </div>
  );
}
