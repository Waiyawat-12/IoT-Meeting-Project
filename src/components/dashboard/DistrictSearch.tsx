"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFlood } from "@/context/FloodContext";
import { cn } from "@/lib/utils";

export function DistrictSearch({ className }: { className?: string }) {
  const { rankedDistricts, selectDistrict, setRankingsOpen } = useFlood();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return rankedDistricts
      .filter(
        (d) =>
          d.nameEN.toLowerCase().includes(q) ||
          d.nameTH.includes(query.trim()) ||
          d.zone.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, rankedDistricts]);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const pick = (id: string) => {
    selectDistrict(id);
    setRankingsOpen(false);
    setOpen(false);
    const district = rankedDistricts.find((d) => d.id === id);
    setQuery(district ? district.nameEN : "");
  };

  return (
    <div ref={rootRef} className={cn("relative w-full max-w-xs", className)}>
      <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && matches[0]) {
            event.preventDefault();
            pick(matches[0].id);
          }
          if (event.key === "Escape") setOpen(false);
        }}
        placeholder="Search district / เขต"
        aria-label="Search district"
        className="h-9 w-full rounded-lg border border-border bg-background/70 pl-8 pr-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-cyan-500/50"
      />
      {open && matches.length > 0 ? (
        <ul className="absolute top-[calc(100%+6px)] z-[80] w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl backdrop-blur-xl">
          {matches.map((district) => {
            const rank =
              rankedDistricts.findIndex((d) => d.id === district.id) + 1;
            return (
              <li key={district.id}>
                <button
                  type="button"
                  onClick={() => pick(district.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm hover:bg-cyan-500/10",
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium">
                      {district.nameEN}
                    </span>
                    <span className="block truncate text-[11px] text-muted">
                      {district.nameTH}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-muted">
                    #{rank}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
