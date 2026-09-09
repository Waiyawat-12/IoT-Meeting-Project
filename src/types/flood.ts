export type DistrictZone =
  | "Inner"
  | "North"
  | "East"
  | "South"
  | "West"
  | "Thonburi";

export type RiskLevel = "low" | "moderate" | "high" | "critical";

export type PumpHealth = "online" | "strained" | "degraded";

export type RecommendationCode =
  | "all_clear"
  | "standby"
  | "prepare_pumps"
  | "emergency";

export interface District {
  id: string;
  code: number;
  nameTH: string;
  nameEN: string;
  baseVulnerability: number;
  pumpsActive: number;
  pumpsTotal: number;
  centroid: [number, number];
  areaSqKm: number;
  zone: DistrictZone;
  notes: string;
}

export interface WeatherInputs {
  rainChance: number;
  rainIntensity: number;
}

export interface RiskBreakdown {
  rainChanceContribution: number;
  rainIntensityContribution: number;
  vulnerabilityContribution: number;
  rawTotal: number;
  riskScore: number;
  riskLevel: RiskLevel;
}

export interface ActionRecommendation {
  code: RecommendationCode;
  titleEN: string;
  titleTH: string;
  detailEN: string;
  detailTH: string;
  actions: string[];
}

export interface PumpStatus {
  labelEN: string;
  labelTH: string;
  health: PumpHealth;
  utilization: number;
}

export interface DistrictRisk extends District {
  riskScore: number;
  riskLevel: RiskLevel;
  breakdown: RiskBreakdown;
  recommendation: ActionRecommendation;
  pumpStatus: PumpStatus;
}

export interface ScenarioPreset {
  id: string;
  nameEN: string;
  nameTH: string;
  rainChance: number;
  rainIntensity: number;
  blurb: string;
}

export interface CityRiskSummary {
  averageRisk: number;
  maxRisk: DistrictRisk;
  minRisk: DistrictRisk;
  counts: Record<RiskLevel, number>;
  pumpsActive: number;
  pumpsTotal: number;
  criticalDistricts: DistrictRisk[];
}
