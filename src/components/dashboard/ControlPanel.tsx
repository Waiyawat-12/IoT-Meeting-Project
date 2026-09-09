"use client";

import { CloudRain, CloudSun, Gauge, Waves, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useFlood } from "@/context/FloodContext";
import { intensityLabel } from "@/lib/floodEngine";
import { SCENARIO_PRESETS } from "@/lib/scenarios";

const PRESET_ICONS = {
  sunny: CloudSun,
  seasonal: CloudRain,
  severe: Zap,
} as const;

export function ControlPanel() {
  const { weather, setRainChance, setRainIntensity, applyScenario } = useFlood();

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-white/5">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-cyan-100">
            <Gauge className="h-4 w-4 text-cyan-300" />
            Simulation &amp; Control
          </CardTitle>
          <Badge variant="cyan">Global</Badge>
        </div>
        <p className="text-xs text-slate-400">
          Rain inputs recalculate all 50 districts instantly.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-300">Rain chance</span>
            <span className="font-mono text-cyan-200">{weather.rainChance}%</span>
          </div>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[weather.rainChance]}
            onValueChange={([value]) => setRainChance(value)}
            aria-label="Rain chance"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Waves className="h-3.5 w-3.5 text-sky-300" />
              Rain intensity
            </span>
            <span className="font-mono text-cyan-200">
              {weather.rainIntensity} mm/hr · {intensityLabel(weather.rainIntensity)}
            </span>
          </div>
          <Slider
            min={0}
            max={120}
            step={1}
            value={[weather.rainIntensity]}
            onValueChange={([value]) => setRainIntensity(value)}
            aria-label="Rain intensity"
          />
          <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
            <span>Light</span>
            <span>Extreme 120</span>
          </div>
        </div>

        <div className="grid gap-2">
          {SCENARIO_PRESETS.map((preset) => {
            const Icon = PRESET_ICONS[preset.id as keyof typeof PRESET_ICONS];
            const active =
              weather.rainChance === preset.rainChance &&
              weather.rainIntensity === preset.rainIntensity;
            return (
              <Button
                key={preset.id}
                variant={active ? "default" : "secondary"}
                className="h-auto justify-start py-2.5 text-left"
                onClick={() =>
                  applyScenario({
                    rainChance: preset.rainChance,
                    rainIntensity: preset.rainIntensity,
                  })
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs font-semibold">
                    {preset.nameEN}
                    <span className="ml-2 font-normal opacity-80">{preset.nameTH}</span>
                  </span>
                  <span className="text-[11px] font-normal opacity-80">
                    Rain {preset.rainChance}% · {preset.rainIntensity} mm/hr
                  </span>
                </span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
