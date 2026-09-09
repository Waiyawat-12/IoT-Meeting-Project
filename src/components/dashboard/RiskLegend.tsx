import { RISK_COLORS, RISK_LABELS } from "@/lib/floodEngine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RiskLevel } from "@/types/flood";

const BANDS: { level: RiskLevel; range: string }[] = [
  { level: "low", range: "0–29%" },
  { level: "moderate", range: "30–59%" },
  { level: "high", range: "60–79%" },
  { level: "critical", range: "80–100%" },
];

export function RiskLegend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk heat map</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {BANDS.map((band) => (
          <div
            key={band.level}
            className="flex items-center gap-2 rounded-xl border border-border bg-slate-900/4 px-2.5 py-2 dark:bg-white/4"
          >
            <span
              className="h-3.5 w-3.5 rounded-md ring-1 ring-border"
              style={{ background: RISK_COLORS[band.level] }}
            />
            <div>
              <p className="text-xs font-medium text-foreground">
                {RISK_LABELS[band.level].en}
                <span className="ml-1 text-muted">{RISK_LABELS[band.level].th}</span>
              </p>
              <p className="font-mono text-[10px] text-muted">{band.range}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
