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
import { useTheme } from "next-themes";
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
const LINE_COLOR_DARK: [number, number, number, number] = [255, 255, 255, 51];
const LINE_COLOR_LIGHT: [number, number, number, number] = [15, 23, 42, 90];
const LINE_COLOR_SELECTED: [number, number, number, number] = [8, 145, 178, 230];
const HIGHLIGHT: [number, number, number, number] = [255, 255, 255, 48];

function createLighting(isDark: boolean) {
  return new LightingEffect({
    ambient: new AmbientLight({
      color: isDark ? [186, 214, 232] : [255, 255, 255],
      intensity: isDark ? 0.72 : 0.95,
    }),
    dir: new DirectionalLight({
      color: [255, 255, 255],
      intensity: isDark ? 1.35 : 1.1,
      direction: [-4, -9, -6],
    }),
  });
}

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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const mapClearColor = isDark
    ? ([9, 9, 11, 255] as [number, number, number, number])
    : ([226, 232, 240, 255] as [number, number, number, number]);
  const lightingEffect = useMemo(() => createLighting(isDark), [isDark]);
  const [geojson, setGeojson] = useState<FeatureCollection<Geometry, DistrictProps> | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const mapView = useMemo(
    () =>
      new MapView({
        id: "map",
        repeat: false,
        farZMultiplier: 4,
        clearColor: mapClearColor,
      }),
    [mapClearColor],
  );

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

  const [hoverTip, setHoverTip] = useState<{
    x: number;
    y: number;
    nameEN: string;
    nameTH: string;
    score: number;
  } | null>(null);

  const onDistrictClick = useCallback(
    (info: PickingInfo<DistrictFeature>) => {
      const id = info.object?.properties?.id;
      if (id) selectDistrict(id);
    },
    [selectDistrict],
  );

  const onDistrictHover = useCallback(
    (info: PickingInfo<DistrictFeature>) => {
      const id = info.object?.properties?.id;
      if (!id) {
        setHoverTip(null);
        return;
      }
      const infoRow = scoreById.get(id);
      if (!infoRow) {
        setHoverTip(null);
        return;
      }
      setHoverTip({
        x: info.x,
        y: info.y,
        nameEN: infoRow.nameEN,
        nameTH: infoRow.nameTH,
        score: infoRow.score,
      });
    },
    [scoreById],
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
        wireframe: true,
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
            : isDark
              ? LINE_COLOR_DARK
              : LINE_COLOR_LIGHT,
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
        onHover: onDistrictHover,
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
          getLineColor: [selectedId, isDark],
          getLineWidth: [selectedId],
        },
      }),
    ];
  }, [geojson, isDark, onDistrictClick, onDistrictHover, scoreById, selectedId, weather]);

  return (
    <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl border border-border bg-map">
      {error ? (
        <div className="flex h-full items-center justify-center text-sm text-rose-600 dark:text-rose-200">
          {error}
        </div>
      ) : null}
      <DeckGL
        width="100%"
        height="100%"
        views={mapView}
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
        pickingRadius={8}
        getCursor={({ isDragging, isHovering }) =>
          isDragging ? "grabbing" : isHovering ? "pointer" : "grab"
        }
        style={{ background: isDark ? "#09090b" : "#e2e8f0" }}
      />
      {hoverTip ? (
        <div
          className="bkk-deck-tooltip pointer-events-none absolute z-20"
          style={{ left: hoverTip.x + 14, top: hoverTip.y + 12 }}
        >
          <div className="bkk-tip">
            <strong>{hoverTip.nameEN}</strong>
            <span>{hoverTip.nameTH}</span>
            <em>{hoverTip.score}%</em>
          </div>
        </div>
      ) : null}
      {!geojson && !error ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-map/70 text-sm text-cyan-800 dark:text-cyan-100">
          Loading 3D Bangkok districts…
        </div>
      ) : null}
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-border bg-card/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-muted">
        Drag pan · Ctrl-drag rotate · Scroll zoom
      </p>
    </div>
  );
}
