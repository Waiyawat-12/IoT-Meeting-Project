"use client";

import Link from "next/link";
import { Activity, Droplets, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { DistrictSearch } from "@/components/dashboard/DistrictSearch";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFlood } from "@/context/FloodContext";

export function DashboardHeader() {
  const { summary, setRankingsOpen } = useFlood();
  const [now, setNow] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      setNow(
        new Intl.DateTimeFormat("th-TH", {
          timeZone: "Asia/Bangkok",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const cityLevel = summary.maxRisk.riskLevel;

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-header px-4 backdrop-blur-xl">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-500/40">
          <Droplets className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
        </div>
        <div className="min-w-0 hidden sm:block">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300/80">
            BMA Flood Ops · Smart City Prototype
          </p>
          <h1 className="truncate text-base font-semibold leading-tight text-foreground lg:text-lg">
            Bangkok Smart Flood Risk
            <span className="ml-2 hidden text-cyan-800/80 dark:text-cyan-200/80 xl:inline">
              ระบบพยากรณ์น้ำท่วมกรุงเทพฯ
            </span>
          </h1>
        </div>
      </div>

      <div className="mx-auto hidden min-w-0 flex-1 justify-center md:flex">
        <DistrictSearch />
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <div className="w-36 md:hidden">
          <DistrictSearch className="max-w-none" />
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => setRankingsOpen(true)}
          aria-label="Open district rankings"
        >
          🏆 Rankings
        </Button>
        <ThemeToggle />
        <Badge
          variant="cyan"
          className="hidden gap-1.5 normal-case tracking-normal lg:inline-flex"
        >
          <Radio className="h-3 w-3 animate-pulse" />
          Live sim · ICT+07 {now}
        </Badge>
        <Badge
          variant={cityLevel}
          className="hidden gap-1.5 normal-case tracking-normal sm:inline-flex"
        >
          <Activity className="h-3 w-3" />
          Peak {summary.maxRisk.riskScore}%
        </Badge>
        <Link
          href="/architecture"
          className="hidden rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted hover:bg-slate-900/5 hover:text-foreground dark:hover:bg-white/8 xl:inline"
        >
          Architecture
        </Link>
      </div>
    </header>
  );
}
