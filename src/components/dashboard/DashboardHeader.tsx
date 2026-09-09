"use client";

import Link from "next/link";
import { Activity, Droplets, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useFlood } from "@/context/FloodContext";
import { RISK_LABELS } from "@/lib/floodEngine";

export function DashboardHeader() {
  const { summary } = useFlood();
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
    <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/40">
          <Droplets className="h-5 w-5 text-cyan-300" />
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">
            BMA Flood Ops · Smart City Prototype
          </p>
          <h1 className="text-lg font-semibold leading-tight text-white sm:text-xl">
            Bangkok Smart Flood Risk
            <span className="ml-2 text-cyan-200/80">ระบบพยากรณ์น้ำท่วมกรุงเทพฯ</span>
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="cyan" className="gap-1.5 normal-case tracking-normal">
          <Radio className="h-3 w-3 animate-pulse" />
          Live sim · ICT+07 {now}
        </Badge>
        <Badge variant={cityLevel} className="gap-1.5 normal-case tracking-normal">
          <Activity className="h-3 w-3" />
          City peak {RISK_LABELS[cityLevel].en} {summary.maxRisk.riskScore}%
        </Badge>
        <Link
          href="/architecture"
          className="rounded-full border border-white/10 px-3 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/8"
        >
          System architecture
        </Link>
      </div>
    </header>
  );
}
