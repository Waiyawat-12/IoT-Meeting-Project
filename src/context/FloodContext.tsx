"use client";

import * as React from "react";
import { DISTRICTS } from "@/data/districtsData";
import { evaluateCity, summarizeCity } from "@/lib/floodEngine";
import { DEFAULT_WEATHER } from "@/lib/scenarios";
import type { DistrictRisk, WeatherInputs } from "@/types/flood";

interface FloodContextValue {
  weather: WeatherInputs;
  setRainChance: (value: number) => void;
  setRainIntensity: (value: number) => void;
  applyScenario: (weather: WeatherInputs) => void;
  rankedDistricts: DistrictRisk[];
  selectedId: string | null;
  selectedDistrict: DistrictRisk | null;
  selectedRank: number | null;
  selectDistrict: (id: string | null) => void;
  rankingsOpen: boolean;
  setRankingsOpen: (open: boolean) => void;
  summary: ReturnType<typeof summarizeCity>;
}

const FloodContext = React.createContext<FloodContextValue | null>(null);

export function FloodProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = React.useState<WeatherInputs>(DEFAULT_WEATHER);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [rankingsOpen, setRankingsOpen] = React.useState(false);

  const rankedDistricts = React.useMemo(
    () => evaluateCity(DISTRICTS, weather),
    [weather],
  );

  const summary = React.useMemo(
    () => summarizeCity(rankedDistricts),
    [rankedDistricts],
  );

  const selectedDistrict = React.useMemo(
    () => rankedDistricts.find((d) => d.id === selectedId) ?? null,
    [rankedDistricts, selectedId],
  );

  const selectedRank = React.useMemo(() => {
    if (!selectedId) return null;
    const index = rankedDistricts.findIndex((d) => d.id === selectedId);
    return index >= 0 ? index + 1 : null;
  }, [rankedDistricts, selectedId]);

  const value = React.useMemo<FloodContextValue>(
    () => ({
      weather,
      setRainChance: (rainChance) =>
        setWeather((prev) => ({ ...prev, rainChance })),
      setRainIntensity: (rainIntensity) =>
        setWeather((prev) => ({ ...prev, rainIntensity })),
      applyScenario: (next) => setWeather(next),
      rankedDistricts,
      selectedId,
      selectedDistrict,
      selectedRank,
      selectDistrict: setSelectedId,
      rankingsOpen,
      setRankingsOpen,
      summary,
    }),
    [
      weather,
      rankedDistricts,
      selectedId,
      selectedDistrict,
      selectedRank,
      rankingsOpen,
      summary,
    ],
  );

  return <FloodContext.Provider value={value}>{children}</FloodContext.Provider>;
}

export function useFlood() {
  const ctx = React.useContext(FloodContext);
  if (!ctx) throw new Error("useFlood must be used within FloodProvider");
  return ctx;
}
