"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFlood } from "@/context/FloodContext";
import { cn } from "@/lib/utils";
import { RISK_COLORS } from "@/lib/floodEngine";

export function DistrictList({
  onPick,
  className,
}: {
  onPick?: () => void;
  className?: string;
}) {
  const { rankedDistricts, selectedId, selectDistrict } = useFlood();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rankedDistricts;
    return rankedDistricts.filter(
      (d) =>
        d.nameEN.toLowerCase().includes(q) ||
        d.nameTH.includes(query.trim()) ||
        d.zone.toLowerCase().includes(q),
    );
  }, [query, rankedDistricts]);

  return (
    <Card className={cn("flex h-full min-h-0 flex-1 flex-col", className)}>
      <CardHeader>
        <CardTitle className="sr-only">District ranking</CardTitle>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter เขต / district"
            className="h-9 w-full rounded-lg border border-border bg-background/60 pl-8 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-cyan-500/50"
          />
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 pt-0">
        <ScrollArea className="h-[min(56vh,520px)] pr-2">
          <ul className="space-y-1.5">
            {filtered.map((district) => {
              const rank =
                rankedDistricts.findIndex((d) => d.id === district.id) + 1;
              return (
                <li key={district.id}>
                  <button
                    type="button"
                    onClick={() => {
                      selectDistrict(district.id);
                      onPick?.();
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-2.5 py-2 text-left transition-colors",
                      selectedId === district.id
                        ? "border-cyan-400/50 bg-cyan-500/10"
                        : "border-transparent bg-slate-900/4 hover:bg-slate-900/8 dark:bg-white/4 dark:hover:bg-white/8",
                    )}
                  >
                    <span className="w-6 font-mono text-[11px] text-muted">
                      #{rank}
                    </span>
                    <span
                      className="h-8 w-1.5 rounded-full"
                      style={{ background: RISK_COLORS[district.riskLevel] }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-foreground">
                        {district.nameEN}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {district.nameTH} · {district.zone}
                      </span>
                    </span>
                    <Badge variant={district.riskLevel} className="font-mono">
                      {district.riskScore}%
                    </Badge>
                  </button>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
