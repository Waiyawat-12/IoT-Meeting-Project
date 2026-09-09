import type { Feature, FeatureCollection, Geometry } from "geojson";

export const LOCAL_GEOJSON_PATH = "/bkk-districts.json";

export const REMOTE_GEOJSON_URLS = [
  "https://raw.githubusercontent.com/chingchai/OpenGISData-Thailand/master/districts.geojson",
  "https://cdn.jsdelivr.net/gh/chingchai/OpenGISData-Thailand@master/districts.geojson",
];

type Props = Record<string, unknown>;

function asRecord(value: unknown): Props {
  return value && typeof value === "object" ? (value as Props) : {};
}

function readString(props: Props, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = props[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return undefined;
}

export function isBangkokFeature(feature: Feature): boolean {
  const props = asRecord(feature.properties);
  const id = readString(props, ["id", "district_code"]);
  if (id?.startsWith("TH10") && id.length === 6) return true;

  const proCode = readString(props, ["pro_code", "province_code"]);
  if (proCode === "10" || proCode === "TH10") return true;

  const province = readString(props, ["pro_en", "province_name_en", "pro_th"]);
  return province === "Bangkok" || province === "กรุงเทพมหานคร";
}

export function normalizeDistrictFeature(
  feature: Feature<Geometry, Props>,
): Feature<Geometry, Props> {
  const props = asRecord(feature.properties);
  const code =
    readString(props, ["districtCode", "amp_code", "district_code"])?.replace(
      /^TH/i,
      "",
    ) ?? "";
  const id =
    readString(props, ["id"]) ?? (code ? `TH${code.padStart(4, "0")}` : "");
  const nameTH =
    readString(props, ["nameTH", "amp_th", "district_name_th"]) ?? "ไม่ทราบเขต";
  const nameEN =
    readString(props, ["nameEN", "amp_en", "district_name_en"]) ?? "Unknown";

  return {
    ...feature,
    properties: {
      ...props,
      id,
      nameTH,
      nameEN,
      districtCode: code,
    },
  };
}

export function toBangkokCollection(
  raw: FeatureCollection,
): FeatureCollection<Geometry, Props> {
  const features = raw.features
    .filter(isBangkokFeature)
    .map((feature) =>
      normalizeDistrictFeature(feature as Feature<Geometry, Props>),
    )
    .filter((feature) => Boolean(feature.properties?.id));

  return { type: "FeatureCollection", features };
}

export async function loadBangkokGeoJSON(): Promise<FeatureCollection> {
  const local = await fetch(LOCAL_GEOJSON_PATH);
  if (local.ok) {
    const json = (await local.json()) as FeatureCollection;
    const normalized = toBangkokCollection(json);
    if (normalized.features.length > 0) return normalized;
  }

  for (const url of REMOTE_GEOJSON_URLS) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const json = (await response.json()) as FeatureCollection;
      const normalized = toBangkokCollection(json);
      if (normalized.features.length > 0) return normalized;
    } catch {
      // try next source
    }
  }

  throw new Error("Unable to load Bangkok district boundaries.");
}
