"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useFlood } from "@/context/FloodContext";
import { RISK_COLORS, RISK_LABELS } from "@/lib/floodEngine";
import { cn } from "@/lib/utils";

export function DistrictDrawer() {
  const { selectedDistrict, selectedRank, rankedDistricts, selectDistrict } =
    useFlood();
  const open = Boolean(selectedDistrict);
  const total = rankedDistricts.length;

  return (
    <aside
      className={cn(
        "fixed bottom-0 right-0 top-16 z-40 flex w-full max-w-md flex-col border-l border-border bg-background/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300",
        open ? "translate-x-0 pointer-events-auto" : "pointer-events-none translate-x-full",
      )}
      aria-hidden={!open}
    >
      {selectedDistrict ? (
        <>
          <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                District risk breakdown
              </p>
              <h2 className="text-2xl font-semibold text-foreground">
                {selectedDistrict.nameEN}
              </h2>
              <p className="text-lg text-muted">{selectedDistrict.nameTH}</p>
              <p className="mt-1 text-xs text-muted">
                {selectedDistrict.zone} · {selectedDistrict.areaSqKm} km² ·{" "}
                {selectedDistrict.id}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => selectDistrict(null)}
              aria-label="Close district details"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
            <div
              className="rounded-2xl border p-4"
              style={{
                borderColor: `${RISK_COLORS[selectedDistrict.riskLevel]}55`,
                background: `${RISK_COLORS[selectedDistrict.riskLevel]}14`,
              }}
            >
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">
                    Calculated flood risk
                  </p>
                  <p className="font-mono text-5xl font-semibold text-foreground">
                    {selectedDistrict.riskScore}
                    <span className="text-2xl text-muted">%</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {selectedRank ? (
                    <Badge
                      variant="cyan"
                      className="px-3 py-1 font-mono text-sm normal-case tracking-normal"
                    >
                      Rank #{selectedRank} / {total}
                    </Badge>
                  ) : null}
                  <Badge variant={selectedDistrict.riskLevel}>
                    {RISK_LABELS[selectedDistrict.riskLevel].en} /{" "}
                    {RISK_LABELS[selectedDistrict.riskLevel].th}
                  </Badge>
                </div>
              </div>
              <Progress
                className="mt-4 h-2.5"
                value={selectedDistrict.riskScore}
                indicatorClassName="bg-white"
              />
            </div>

            <section>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                Engine contributions
              </h3>
              <Contribution
                label="Rain chance × 0.35"
                value={selectedDistrict.breakdown.rainChanceContribution}
              />
              <Contribution
                label="Rain intensity × 0.45"
                value={selectedDistrict.breakdown.rainIntensityContribution}
              />
              <Contribution
                label="Base vulnerability × 0.20"
                value={selectedDistrict.breakdown.vulnerabilityContribution}
              />
            </section>

            <section className="rounded-2xl border border-border bg-slate-900/4 p-4 dark:bg-white/4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Drainage pump status
              </h3>
              <p className="mt-1 text-sm text-foreground">
                {selectedDistrict.pumpStatus.labelEN}
              </p>
              <p className="text-sm text-muted">
                {selectedDistrict.pumpStatus.labelTH}
              </p>
              <Progress
                className="mt-3"
                value={selectedDistrict.pumpStatus.utilization}
                indicatorClassName={
                  selectedDistrict.pumpStatus.health === "online"
                    ? "bg-emerald-400"
                    : selectedDistrict.pumpStatus.health === "strained"
                      ? "bg-orange-400"
                      : "bg-rose-400"
                }
              />
              <p className="mt-2 text-[11px] text-muted">
                Utilization {selectedDistrict.pumpStatus.utilization}% · health{" "}
                {selectedDistrict.pumpStatus.health}
              </p>
            </section>

            <section className="rounded-2xl border border-cyan-500/20 bg-cyan-500/8 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-800 dark:text-cyan-200">
                AI action recommendation
              </h3>
              <p className="mt-1 text-base font-semibold text-foreground">
                {selectedDistrict.recommendation.titleEN}
              </p>
              <p className="text-sm text-cyan-800/80 dark:text-cyan-100/80">
                {selectedDistrict.recommendation.titleTH}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {selectedDistrict.recommendation.detailEN}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {selectedDistrict.recommendation.actions.map((action) => (
                  <Badge key={action} variant="cyan" className="normal-case tracking-normal">
                    {action}
                  </Badge>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                Why this baseline?
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {selectedDistrict.notes}
              </p>
              <p className="mt-2 font-mono text-[11px] text-muted">
                centroid {selectedDistrict.centroid[0].toFixed(4)},{" "}
                {selectedDistrict.centroid[1].toFixed(4)} · vulnerability{" "}
                {selectedDistrict.baseVulnerability}/100
              </p>
            </section>
          </div>
        </>
      ) : null}
    </aside>
  );
}

function Contribution({ label, value }: { label: string; value: number }) {
  const pct = Math.min(100, (value / 45) * 100);
  return (
    <div className="mb-2">
      <div className="mb-1 flex justify-between text-xs text-muted">
        <span>{label}</span>
        <span className="font-mono text-foreground">{value.toFixed(1)}</span>
      </div>
      <Progress value={pct} indicatorClassName="bg-cyan-300" />
    </div>
  );
}
