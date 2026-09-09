import Link from "next/link";
import { ArchitectureDiagram } from "@/components/dashboard/ArchitectureDiagram";

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link href="/" className="text-sm text-cyan-300 hover:text-cyan-200">
        ← Back to live dashboard
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-white">
        System architecture
      </h1>
      <p className="mt-2 max-w-3xl text-slate-400">
        End-to-end stack for the Bangkok Smart Flood Risk prototype: IoT drainage
        stations on the edge, MQTT ingest, the heuristic flood engine, and the
        operator dashboard.
      </p>
      <div className="mt-8 overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/60 p-4">
        <ArchitectureDiagram />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <h2 className="text-lg font-semibold text-white">Edge (ESP32)</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            Each drainage station reads a tipping-bucket rain gauge, an ultrasonic
            water-level sensor, and pump current. Inference stays on-device so a
            pump can start even if Wi-Fi drops. See{" "}
            <code className="text-cyan-200">firmware/drainage-station</code>.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/4 p-5">
          <h2 className="text-lg font-semibold text-white">Cloud engine</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            District polygons are stored as GeoJSON. The risk engine blends rain
            chance, intensity, and a per-district vulnerability prior. Query it at{" "}
            <code className="text-cyan-200">/api/risk</code>.
          </p>
        </article>
      </div>
    </div>
  );
}
