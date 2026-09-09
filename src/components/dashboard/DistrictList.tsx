"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFlood } from "@/context/FloodContext";
import { cn } from "@/lib/utils";
import { RISK_COLORS } from "@/lib/floodEngine";

export function DistrictList() {
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
    <Card className="flex h-full min-h-0 flex-1 flex-col">
      <CardHeader>
        <CardTitle>District ranking</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search เขต / district"
            className="h-9 w-full rounded-lg border border-white/10 bg-white/5 pl-8 pr-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
          />
        </div>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 pt-0">
        <ScrollArea className="h-[min(52vh,540px)] pr-2 lg:h-full">
          <ul className="space-y-1.5">
            {filtered.map((district, index) => (
              <li key={district.id}>
                <button
                  type="button"
                  onClick={() => selectDistrict(district.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-2.5 py-2 text-left transition-colors",
                    selectedId === district.id
                      ? "border-cyan-300/50 bg-cyan-400/10"
                      : "border-transparent bg-white/4 hover:bg-white/8",
                  )}
                >
                  <span className="w-5 font-mono text-[11px] text-slate-500">
                    {index + 1}
                  </span>
                  <span
                    className="h-8 w-1.5 rounded-full"
                    style={{ background: RISK_COLORS[district.riskLevel] }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-white">
                      {district.nameEN}
                    </span>
                    <span className="block truncate text-[11px] text-slate-400">
                      {district.nameTH} · {district.zone}
                    </span>
                  </span>
                  <Badge variant={district.riskLevel} className="font-mono">
                    {district.riskScore}%
                  </Badge>
                </button>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
