"use client";

import dynamic from "next/dynamic";

export const BangkokMap = dynamic(() => import("./BangkokMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 text-sm text-cyan-100">
      Initializing 3D flood model…
    </div>
  ),
});
