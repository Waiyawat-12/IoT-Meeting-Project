"use client";

import {
  AmbientLight,
  DirectionalLight,
  LightingEffect,
  MapView,
  type MapViewState,
  type PickingInfo,
} from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import { DeckGL } from "@deck.gl/react";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useFlood } from "@/context/FloodContext";
import { getRiskColor } from "@/lib/floodEngine";
import { loadBangkokGeoJSON } from "@/lib/geojson";

const BANGKOK_VIEW: MapViewState = {
  longitude: 100.5018,
  latitude: 13.7563,
  zoom: 10.5,
  pitch: 50,
  bearing: -20,
  minZoom: 8.5,
  maxZoom: 14.5,
  minPitch: 20,
  maxPitch: 70,
};

const FILL_ALPHA = Math.round(0.85 * 255);
const LINE_COLOR: [number, number, number, number] = [255, 255, 255, 51];
const LINE_COLOR_SELECTED: [number, number, number, number] = [165, 243, 252, 230];
const HIGHLIGHT: [number, number, number, number] = [255, 255, 255, 48];

const MAP_VIEW = new MapView({
  id: "map",
  repeat: false,
  farZMultiplier: 4,
  clearColor: [11, 15, 31, 255],
});

const lightingEffect = new LightingEffect({
  ambient: new AmbientLight({
    color: [186, 214, 232],
    intensity: 0.72,
  }),
  dir: new DirectionalLight({
    color: [255, 255, 255],
    intensity: 1.35,
    direction: [-4, -9, -6],
  }),
});

type DistrictProps = {
  id?: string;
  nameTH?: string;
  nameEN?: string;
};

type DistrictFeature = Feature<Geometry, DistrictProps>;

function hexToRgb(hex: string): [number, number, number] {
  const raw = hex.replace("#", "");
  return [
    parseInt(raw.slice(0, 2), 16),
    parseInt(raw.slice(2, 4), 16),
    parseInt(raw.slice(4, 6), 16),
  ];
}

export default function BangkokMapInner() {
  const { rankedDistricts, selectedId, selectDistrict, weather } = useFlood();
  const [geojson, setGeojson] = useState<FeatureCollection<Geometry, DistrictProps> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const scoreById = useMemo(() => {
    const map = new Map<
      string,
      { score: number; nameTH: string; nameEN: string }
    >();
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
        if (!cancelled) {
          setGeojson(data as FeatureCollection<Geometry, DistrictProps>);
        }
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

  const onDistrictClick = useCallback(
    (info: PickingInfo<DistrictFeature>) => {
      const id = info.object?.properties?.id;
      if (id) selectDistrict(id);
    },
    [selectDistrict],
  );

  const layers = useMemo(() => {
    if (!geojson) return [];

    return [
      new GeoJsonLayer<DistrictProps>({
        id: "bangkok-districts-3d",
        data: geojson,
        pickable: true,
        extruded: true,
        filled: true,
        stroked: true,
        wireframe: false,
        opacity: 0.85,
        getElevation: (feature) => {
          const score = scoreById.get(feature.properties?.id ?? "")?.score ?? 0;
          return score * 100;
        },
        getFillColor: (feature) => {
          const id = feature.properties?.id ?? "";
          const score = scoreById.get(id)?.score ?? 0;
          const [r, g, b] = hexToRgb(getRiskColor(score));
          return [r, g, b, id === selectedId ? 242 : FILL_ALPHA];
        },
        getLineColor: (feature) =>
          feature.properties?.id === selectedId
            ? LINE_COLOR_SELECTED
            : LINE_COLOR,
        getLineWidth: (feature) =>
          feature.properties?.id === selectedId ? 3 : 2,
        lineWidthUnits: "pixels",
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 4,
        material: {
          ambient: 0.38,
          diffuse: 0.62,
          shininess: 28,
          specularColor: [80, 200, 220],
        },
        autoHighlight: true,
        highlightColor: HIGHLIGHT,
        onClick: onDistrictClick,
        transitions: {
          getElevation: 400,
          getFillColor: 280,
        },
        updateTriggers: {
          getElevation: [weather.rainChance, weather.rainIntensity],
          getFillColor: [
            weather.rainChance,
            weather.rainIntensity,
            selectedId,
          ],
          getLineColor: [selectedId],
          getLineWidth: [selectedId],
        },
      }),
    ];
  }, [geojson, onDistrictClick, scoreById, selectedId, weather]);

  const getTooltip = useCallback(
    ({ object }: PickingInfo<DistrictFeature>) => {
      const id = object?.properties?.id;
      if (!id) return null;
      const info = scoreById.get(id);
      if (!info) return null;
      return {
        html: `<div class="bkk-tip"><strong>${info.nameEN}</strong><span>${info.nameTH}</span><em>${info.score}%</em></div>`,
        className: "bkk-deck-tooltip",
        style: {
          background: "transparent",
          border: "none",
          boxShadow: "none",
          padding: "0",
          color: "inherit",
        },
      };
    },
    [scoreById],
  );

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1f]">
      {error ? (
        <div className="flex h-full items-center justify-center text-sm text-rose-200">
          {error}
        </div>
      ) : null}
      <DeckGL
        width="100%"
        height="100%"
        views={MAP_VIEW}
        initialViewState={BANGKOK_VIEW}
        controller={{
          dragPan: true,
          dragRotate: true,
          scrollZoom: true,
          doubleClickZoom: true,
          touchZoom: true,
          touchRotate: true,
          inertia: 300,
        }}
        layers={layers}
        effects={[lightingEffect]}
        getTooltip={getTooltip}
        getCursor={({ isDragging, isHovering }) =>
          isDragging ? "grabbing" : isHovering ? "pointer" : "grab"
        }
        style={{ background: "transparent" }}
      />
      {!geojson && !error ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#0b0f1f]/70 text-sm text-cyan-100">
          Loading 3D Bangkok districts…
        </div>
      ) : null}
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/10 bg-[#0b0f1f]/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
        Drag pan · Ctrl-drag rotate · Scroll zoom
      </p>
    </div>
  );
}
