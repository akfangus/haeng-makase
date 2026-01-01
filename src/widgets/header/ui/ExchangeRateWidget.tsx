"use client";

import { RefreshCcw } from "lucide-react";

export function ExchangeRateWidget() {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-wood-background px-3 py-1 text-xs font-medium text-wood-text-muted border border-wood-border">
      <span className="flex items-center gap-1">
        <span className="text-[10px] text-wood-text-muted/60">JPY</span>
        100
      </span>
      <span className="text-wood-border">|</span>
      <span className="flex items-center gap-1 text-wood-text-main">
        <span className="text-[10px] text-wood-text-muted/60">KRW</span>
        905.42
      </span>
      <RefreshCcw className="ml-0.5 size-3 cursor-pointer hover:rotate-180 transition-transform duration-500" />
    </div>
  );
}
