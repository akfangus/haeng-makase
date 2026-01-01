import Link from "next/link";
import { ExchangeRateWidget } from "./ExchangeRateWidget";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-wood-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-md items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-xl">🍱</span>
          <h1 className="text-lg font-bold tracking-tight text-wood-primary">
            행마카세
          </h1>
        </Link>
        <ExchangeRateWidget />
      </div>
    </header>
  );
}
