import type {
  ActionRecommendation,
  CityRiskSummary,
  District,
  DistrictRisk,
  PumpStatus,
  RiskBreakdown,
  RiskLevel,
  WeatherInputs,
} from "@/types/flood";
import { clamp } from "@/lib/utils";

export const RAIN_CHANCE_WEIGHT = 0.35;
export const RAIN_INTENSITY_WEIGHT = 0.45;
export const VULNERABILITY_WEIGHT = 0.2;
export const MAX_INTENSITY_MM_HR = 120;

export const RISK_COLORS: Record<RiskLevel, string> = {
  low: "#10b981",
  moderate: "#eab308",
  high: "#f97316",
  critical: "#f43f5e",
};

export const RISK_LABELS: Record<RiskLevel, { en: string; th: string }> = {
  low: { en: "Low", th: "ต่ำ" },
  moderate: { en: "Moderate", th: "ปานกลาง" },
  high: { en: "High", th: "สูง" },
  critical: { en: "Critical", th: "วิกฤต" },
};

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "moderate";
  return "low";
}

export function getRiskColor(score: number): string {
  return RISK_COLORS[getRiskLevel(score)];
}

/**
 * Heuristic flood risk for a Bangkok district.
 *
 * RiskScore (%) = min(100, round(
 *   (RainChance * 0.35) +
 *   ((RainIntensity / 120) * 100 * 0.45) +
 *   (DistrictBaseVulnerability * 0.20)
 * ))
 */
export function calculateRiskScore(
  rainChance: number,
  rainIntensity: number,
  baseVulnerability: number,
): number {
  return explainRisk(rainChance, rainIntensity, baseVulnerability).riskScore;
}

export function explainRisk(
  rainChance: number,
  rainIntensity: number,
  baseVulnerability: number,
): RiskBreakdown {
  const chance = clamp(rainChance, 0, 100);
  const intensity = clamp(rainIntensity, 0, MAX_INTENSITY_MM_HR);
  const vuln = clamp(baseVulnerability, 0, 100);

  const rainChanceContribution = chance * RAIN_CHANCE_WEIGHT;
  const rainIntensityContribution =
    (intensity / MAX_INTENSITY_MM_HR) * 100 * RAIN_INTENSITY_WEIGHT;
  const vulnerabilityContribution = vuln * VULNERABILITY_WEIGHT;
  const rawTotal =
    rainChanceContribution +
    rainIntensityContribution +
    vulnerabilityContribution;
  const riskScore = Math.min(100, Math.round(rawTotal));

  return {
    rainChanceContribution,
    rainIntensityContribution,
    vulnerabilityContribution,
    rawTotal,
    riskScore,
    riskLevel: getRiskLevel(riskScore),
  };
}

export function getRecommendation(score: number): ActionRecommendation {
  const level = getRiskLevel(score);

  if (level === "critical") {
    return {
      code: "emergency",
      titleEN: "Activate Emergency Drainage",
      titleTH: "เปิดระบบระบายน้ำฉุกเฉิน",
      detailEN:
        "Issue a flood warning, run all pumps, close flood-prone underpasses, and pre-position rescue boats.",
      detailTH:
        "ประกาศเตือนน้ำท่วม เดินเครื่องสูบทั้งหมด ปิดทางลอดเสี่ยงน้ำท่วม และจัดเรือกู้ภัยเตรียมพร้อม",
      actions: [
        "Issue Flood Warning",
        "Run All Drainage Pumps",
        "Close Underpasses",
        "Deploy Traffic Diversions",
      ],
    };
  }

  if (level === "high") {
    return {
      code: "prepare_pumps",
      titleEN: "Prepare Pumps & Issue Traffic Warning",
      titleTH: "เตรียมเครื่องสูบและเตือนจราจร",
      detailEN:
        "Start standby pumps, clear debris from canal grates, and warn motorists about ponding on major roads.",
      detailTH:
        "เดินเครื่องสูบสำรอง เก็บขยะตะแกรงคลอง และเตือนผู้ใช้รถเรื่องน้ำท่วมขังบนถนนสายหลัก",
      actions: [
        "Prepare Pumps",
        "Issue Traffic Warning",
        "Clear Canal Grates",
        "Staff District War Room",
      ],
    };
  }

  if (level === "moderate") {
    return {
      code: "standby",
      titleEN: "Standby Drainage Crews",
      titleTH: "เตรียมพร้อมทีมระบายน้ำ",
      detailEN:
        "Keep pumps in standby, inspect low sois, and monitor canal gauges every 15 minutes.",
      detailTH:
        "ตั้งเครื่องสูบในโหมดพร้อมใช้ ตรวจซอยลุ่ม และเฝ้าเกจคลองทุก 15 นาที",
      actions: [
        "Standby Pumps",
        "Inspect Low Sois",
        "Monitor Canal Gauges",
      ],
    };
  }

  return {
    code: "all_clear",
    titleEN: "All Clear",
    titleTH: "สถานการณ์ปกติ",
    detailEN:
      "Routine monitoring only. Continue scheduled pump maintenance and keep telemetry online.",
    detailTH:
      "เฝ้าระวังตามปกติ บำรุงรักษาเครื่องสูบตามแผน และคงระบบเทเลเมทรีให้ออนไลน์",
    actions: ["Routine Monitoring", "Keep Telemetry Online"],
  };
}

export function getPumpStatus(
  district: District,
  riskScore: number,
): PumpStatus {
  const ratio =
    district.pumpsTotal === 0
      ? 1
      : district.pumpsActive / district.pumpsTotal;
  const utilization = Math.min(
    100,
    Math.round(riskScore * 0.7 + (1 - ratio) * 30),
  );

  if (ratio < 0.75) {
    return {
      health: "degraded",
      utilization,
      labelEN: `${district.pumpsActive}/${district.pumpsTotal} pumps online — degraded`,
      labelTH: `เครื่องสูบออนไลน์ ${district.pumpsActive}/${district.pumpsTotal} — ประสิทธิภาพลด`,
    };
  }

  if (riskScore >= 60) {
    return {
      health: "strained",
      utilization,
      labelEN: `${district.pumpsActive}/${district.pumpsTotal} pumps online — running hard`,
      labelTH: `เครื่องสูบออนไลน์ ${district.pumpsActive}/${district.pumpsTotal} — ทำงานหนัก`,
    };
  }

  return {
    health: "online",
    utilization,
    labelEN: `${district.pumpsActive}/${district.pumpsTotal} pumps online`,
    labelTH: `เครื่องสูบออนไลน์ ${district.pumpsActive}/${district.pumpsTotal}`,
  };
}

export function evaluateDistrict(
  district: District,
  weather: WeatherInputs,
): DistrictRisk {
  const breakdown = explainRisk(
    weather.rainChance,
    weather.rainIntensity,
    district.baseVulnerability,
  );

  return {
    ...district,
    riskScore: breakdown.riskScore,
    riskLevel: breakdown.riskLevel,
    breakdown,
    recommendation: getRecommendation(breakdown.riskScore),
    pumpStatus: getPumpStatus(district, breakdown.riskScore),
  };
}

export function evaluateCity(
  districts: District[],
  weather: WeatherInputs,
): DistrictRisk[] {
  return districts
    .map((district) => evaluateDistrict(district, weather))
    .sort((a, b) => b.riskScore - a.riskScore || a.nameEN.localeCompare(b.nameEN));
}

export function summarizeCity(districts: DistrictRisk[]): CityRiskSummary {
  const counts: CityRiskSummary["counts"] = {
    low: 0,
    moderate: 0,
    high: 0,
    critical: 0,
  };

  for (const d of districts) counts[d.riskLevel] += 1;

  const averageRisk =
    districts.length === 0
      ? 0
      : Math.round(
          districts.reduce((sum, d) => sum + d.riskScore, 0) / districts.length,
        );

  const maxRisk = districts.reduce((best, d) =>
    d.riskScore > best.riskScore ? d : best,
  );
  const minRisk = districts.reduce((best, d) =>
    d.riskScore < best.riskScore ? d : best,
  );

  return {
    averageRisk,
    maxRisk,
    minRisk,
    counts,
    pumpsActive: districts.reduce((sum, d) => sum + d.pumpsActive, 0),
    pumpsTotal: districts.reduce((sum, d) => sum + d.pumpsTotal, 0),
    criticalDistricts: districts.filter((d) => d.riskLevel === "critical"),
  };
}

export function intensityLabel(mmHr: number): string {
  if (mmHr <= 0) return "Dry";
  if (mmHr < 15) return "Light";
  if (mmHr < 40) return "Moderate";
  if (mmHr < 75) return "Heavy";
  if (mmHr < 100) return "Violent";
  return "Extreme";
}
