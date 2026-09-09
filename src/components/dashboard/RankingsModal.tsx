"use client";

import { Trophy } from "lucide-react";
import { DistrictList } from "@/components/dashboard/DistrictList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFlood } from "@/context/FloodContext";

export function RankingsModal() {
  const { rankingsOpen, setRankingsOpen } = useFlood();

  return (
    <Dialog open={rankingsOpen} onOpenChange={setRankingsOpen}>
      <DialogContent aria-describedby={undefined}>
        <div className="border-b border-border px-5 py-4 pr-12">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <Trophy className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
            District rankings
          </DialogTitle>
          <DialogDescription className="mt-1 text-sm text-muted">
            All 50 khet sorted by the live flood-risk score.
          </DialogDescription>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden p-3 pt-2">
          <DistrictList
            onPick={() => setRankingsOpen(false)}
            className="border-0 bg-transparent shadow-none backdrop-blur-none"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
