import type { ScenarioPreset } from "@/types/flood";

export const DEFAULT_WEATHER = {
  rainChance: 42,
  rainIntensity: 18,
};

export const SCENARIO_PRESETS: ScenarioPreset[] = [
  {
    id: "sunny",
    nameEN: "Sunny Day",
    nameTH: "ท้องฟ้าโปร่ง",
    rainChance: 0,
    rainIntensity: 0,
    blurb: "Baseline vulnerability only — a control day for the engine.",
  },
  {
    id: "seasonal",
    nameEN: "Seasonal Downpour",
    nameTH: "ฝนตามฤดูกาล",
    rainChance: 70,
    rainIntensity: 45,
    blurb: "Typical late-afternoon monsoon cell over the Chao Phraya plain.",
  },
  {
    id: "severe",
    nameEN: "Severe Flash Flood Risk",
    nameTH: "เสี่ยงน้ำท่วมฉับพลัน",
    rainChance: 95,
    rainIntensity: 110,
    blurb: "Extreme convective burst — the 2011-style stress test.",
  },
];
