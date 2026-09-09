import { describe, expect, it } from "vitest";
import { DISTRICTS } from "@/data/districtsData";
import {
  calculateRiskScore,
  evaluateCity,
  explainRisk,
  getRiskLevel,
  intensityLabel,
  summarizeCity,
} from "@/lib/floodEngine";

describe("flood risk engine", () => {
  it("implements the specified heuristic formula", () => {
    const rainChance = 70;
    const rainIntensity = 45;
    const vuln = 92;
    const expected = Math.min(
      100,
      Math.round(
        rainChance * 0.35 + (rainIntensity / 120) * 100 * 0.45 + vuln * 0.2,
      ),
    );
    expect(calculateRiskScore(rainChance, rainIntensity, vuln)).toBe(expected);
    expect(expected).toBe(60);
  });

  it("keeps sunny-day risk equal to 20% of baseline vulnerability", () => {
    expect(calculateRiskScore(0, 0, 92)).toBe(18);
    expect(calculateRiskScore(0, 0, 32)).toBe(6);
    expect(getRiskLevel(18)).toBe("low");
  });

  it("pushes low-lying districts into critical on the flash-flood preset", () => {
    const latPhrao = DISTRICTS.find((d) => d.nameEN === "Lat Phrao");
    const phraNakhon = DISTRICTS.find((d) => d.nameEN === "Phra Nakhon");
    expect(latPhrao).toBeTruthy();
    expect(phraNakhon).toBeTruthy();

    const severeLat = calculateRiskScore(95, 110, latPhrao!.baseVulnerability);
    const severeCore = calculateRiskScore(95, 110, phraNakhon!.baseVulnerability);

    expect(latPhrao!.baseVulnerability).toBeGreaterThan(
      phraNakhon!.baseVulnerability,
    );
    expect(severeLat).toBeGreaterThan(severeCore);
    expect(severeLat).toBeGreaterThanOrEqual(80);
    expect(getRiskLevel(severeLat)).toBe("critical");
  });

  it("clamps scores at 100 and inputs to legal ranges", () => {
    expect(calculateRiskScore(100, 120, 100)).toBe(100);
    expect(calculateRiskScore(400, 900, 100)).toBe(100);
    expect(calculateRiskScore(-10, -4, -3)).toBe(0);
  });

  it("classifies risk bands used by the heat map", () => {
    expect(getRiskLevel(0)).toBe("low");
    expect(getRiskLevel(29)).toBe("low");
    expect(getRiskLevel(30)).toBe("moderate");
    expect(getRiskLevel(59)).toBe("moderate");
    expect(getRiskLevel(60)).toBe("high");
    expect(getRiskLevel(79)).toBe("high");
    expect(getRiskLevel(80)).toBe("critical");
    expect(getRiskLevel(100)).toBe("critical");
  });

  it("evaluates all 50 districts and returns a city summary", () => {
    expect(DISTRICTS).toHaveLength(50);
    const ranked = evaluateCity(DISTRICTS, {
      rainChance: 70,
      rainIntensity: 45,
    });
    expect(ranked).toHaveLength(50);
    expect(ranked[0].riskScore).toBeGreaterThanOrEqual(ranked.at(-1)!.riskScore);

    const summary = summarizeCity(ranked);
    expect(summary.counts.low + summary.counts.moderate + summary.counts.high + summary.counts.critical).toBe(50);
    expect(summary.maxRisk.nameEN).toBe("Lat Phrao");
  });

  it("exposes additive contributions that sum to the raw total", () => {
    const breakdown = explainRisk(70, 45, 92);
    expect(
      breakdown.rainChanceContribution +
        breakdown.rainIntensityContribution +
        breakdown.vulnerabilityContribution,
    ).toBeCloseTo(breakdown.rawTotal, 8);
  });

  it("labels rainfall intensity bands", () => {
    expect(intensityLabel(0)).toBe("Dry");
    expect(intensityLabel(12)).toBe("Light");
    expect(intensityLabel(45)).toBe("Heavy");
    expect(intensityLabel(110)).toBe("Extreme");
  });
});
