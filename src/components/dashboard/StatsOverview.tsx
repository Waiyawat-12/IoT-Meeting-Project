"use client";

import { AlertTriangle, ArrowDownRight, ArrowUpRight, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useFlood } from "@/context/FloodContext";
import { RISK_COLORS, RISK_LABELS } from "@/lib/floodEngine";

export function StatsOverview() {
  const { summary, rankedDistricts } = useFlood();
  const tiles = [
    {
      label: "City average risk",
      value: `${summary.averageRisk}%`,
      hint: `${rankedDistricts.length} districts`,
      icon: Droplets,
    },
    {
      label: "Highest district",
      value: `${summary.maxRisk.riskScore}%`,
      hint: summary.maxRisk.nameEN,
      icon: ArrowUpRight,
    },
    {
      label: "Lowest district",
      value: `${summary.minRisk.riskScore}%`,
      hint: summary.minRisk.nameEN,
      icon: ArrowDownRight,
    },
    {
      label: "Critical alerts",
      value: String(summary.counts.critical),
      hint: `${summary.pumpsActive}/${summary.pumpsTotal} pumps`,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {tiles.map((tile) => (
        <Card key={tile.label} className="p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[11px] uppercase tracking-wider text-muted">
              {tile.label}
            </p>
            <tile.icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
          </div>
          <p className="mt-1 font-mono text-xl font-semibold text-foreground">{tile.value}</p>
          <p className="truncate text-xs text-muted">{tile.hint}</p>
        </Card>
      ))}
      <Card className="col-span-2 p-3">
        <p className="mb-2 text-[11px] uppercase tracking-wider text-muted">
          Heat-map distribution
        </p>
        <div className="flex h-2.5 overflow-hidden rounded-full">
          {(["low", "moderate", "high", "critical"] as const).map((level) => (
            <div
              key={level}
              className="h-full"
              style={{
                width: `${(summary.counts[level] / rankedDistricts.length) * 100}%`,
                background: RISK_COLORS[level],
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted">
          {(["low", "moderate", "high", "critical"] as const).map((level) => (
            <span key={level} className="inline-flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: RISK_COLORS[level] }}
              />
              {RISK_LABELS[level].en} {summary.counts[level]}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
