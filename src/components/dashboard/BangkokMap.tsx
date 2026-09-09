"use client";

import dynamic from "next/dynamic";

export const BangkokMap = dynamic(() => import("./BangkokMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center rounded-2xl border border-border bg-map text-sm text-muted">
      Initializing 3D flood model…
    </div>
  ),
});
