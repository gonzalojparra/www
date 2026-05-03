"use client"

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/Argentina/Buenos_Aires",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function getArgentinaTime(): string {
  return `${formatter.format(new Date())} — neuquén, ar`
}

const tickListeners = new Set<() => void>();
let tickInterval: ReturnType<typeof setInterval> | undefined;

function subscribe(onChange: () => void): () => void {
  tickListeners.add(onChange);
  if (tickInterval === undefined) {
    tickInterval = setInterval(() => {
      tickListeners.forEach((cb) => cb());
    }, 30000);
  }
  return () => {
    tickListeners.delete(onChange);
    if (tickListeners.size === 0 && tickInterval !== undefined) {
      clearInterval(tickInterval);
      tickInterval = undefined;
    }
  };
}

function getServerSnapshot(): string | null {
  return null;
}

export function LocalClock() {
  const time = useSyncExternalStore(subscribe, getArgentinaTime, getServerSnapshot);

  return (
    <div
      className="font-mono text-[10.5px] inline-flex gap-2 items-center"
    >
      <span
        className="w-1.25 h-1.25 bg-[oklch(0.7_0.14_145)] rounded-full"
      />
      <span>{time ?? "— neuquén, ar"}</span>
    </div>
  );
}
