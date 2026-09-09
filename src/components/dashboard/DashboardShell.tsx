"use client";

import { ControlPanel } from "@/components/dashboard/ControlPanel";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DistrictDrawer } from "@/components/dashboard/DistrictDrawer";
import { RankingsModal } from "@/components/dashboard/RankingsModal";
import { BangkokMap } from "@/components/dashboard/BangkokMap";
import { RiskLegend } from "@/components/dashboard/RiskLegend";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { FloodProvider } from "@/context/FloodContext";

export function DashboardShell() {
  return (
    <FloodProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <main className="mx-auto grid w-full max-w-[1680px] flex-1 grid-cols-1 gap-3 p-3 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:p-4">
          <section className="flex flex-col gap-3">
            <ControlPanel />
            <StatsOverview />
            <RiskLegend />
          </section>
          <section className="flex h-[68vh] min-h-[520px] flex-col gap-2 lg:h-[calc(100vh-5.5rem)]">
            <BangkokMap />
            <p className="rounded-xl border border-border bg-card px-3 py-2 font-mono text-[11px] leading-relaxed text-muted">
              RiskScore = min(100, round(RainChance×0.35 + (RainIntensity/120)×100×0.45 + BaseVulnerability×0.20))
            </p>
          </section>
        </main>
        <DistrictDrawer />
        <RankingsModal />
      </div>
    </FloodProvider>
  );
}
