import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-white/15 bg-white/10 text-slate-100",
        low: "border-emerald-400/30 bg-emerald-400/15 text-emerald-200",
        moderate: "border-amber-400/30 bg-amber-400/15 text-amber-200",
        high: "border-orange-400/30 bg-orange-400/15 text-orange-200",
        critical: "border-rose-400/30 bg-rose-400/15 text-rose-200",
        cyan: "border-cyan-400/30 bg-cyan-400/15 text-cyan-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
