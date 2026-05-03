"use client"

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useLanyardWS } from "@/hooks/use-lanyard";

export const discordId = "654163755797577747";

function fmt(s: number) {
  const safe = Math.max(0, Math.floor(s));
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, "0")}`;
}

function useThrottle<T>(value: T, limit = 1000): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastRan.current;

    if (elapsed >= limit) {
      setThrottledValue(value);
      lastRan.current = now;
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }, limit - elapsed);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [value, limit]);

  return throttledValue;
}

export function NowPlaying() {
  const raw = useLanyardWS(discordId);
  const data = useThrottle(raw);
  const spotify = data?.spotify ?? null;

  const [elapsed, setElapsed] = useState(0);

  const spotifyStart = spotify?.timestamps.start;

  useEffect(() => {
    if (spotifyStart === undefined) return;

    const update = () => {
      setElapsed(Math.floor((Date.now() - spotifyStart) / 1000));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [spotifyStart]);

  if (!spotify) {
    return <div aria-hidden="true" className="mt-9 min-h-19.5" />;
  }

  const total = Math.floor((spotify.timestamps.end - spotify.timestamps.start) / 1000);
  const pct = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;

  const body = (
    <>
      <div
        aria-hidden="true"
        className="w-11 h-11 rounded-md bg-[linear-gradient(135deg,oklch(0.55_0.22_285)_0%,oklch(0.65_0.18_320)_100%)] relative overflow-hidden shrink-0"
      >
        {spotify.album_art_url ? (
          <Image
            src={spotify.album_art_url}
            alt={spotify.album}
            width={44}
            height={44}
            sizes="44px"
            className="w-full h-full object-cover block"
          />
        ) : (
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,oklch(0.85_0.15_200/0.5),transparent_50%),radial-gradient(circle_at_70%_70%,oklch(0.45_0.20_340/0.5),transparent_50%)]"
          />
        )}
      </div>

      <div className="min-w-0">
        <div
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-(--ink-3) flex items-center gap-1.5 mb-1"
        >
          <span
            aria-hidden="true"
            className="inline-flex items-end gap-0.5 h-2.5"
          >
            {[
              { delay: "0s", height: "60%" },
              { delay: "0.15s", height: "100%" },
              { delay: "0.3s", height: "40%" },
            ].map((bar, i) => (
              <span
                key={i}
                className="w-0.5 bg-(--accent) rounded-[1px] animate-[audio-bar_1.1s_ease-in-out_infinite]"
                style={{ animationDelay: bar.delay, height: bar.height }}
              />
            ))}
          </span>
          now playing on spotify
        </div>
        <div
          className="text-[13px] text-(--ink) whitespace-nowrap overflow-hidden text-ellipsis [transition:color_var(--t-fast)] group-hover:text-(--accent) group-focus-visible:text-(--accent)"
        >
          {spotify.song} <span className="text-(--ink-2)">— {spotify.artist}</span>
        </div>
      </div>

      <div
        className="font-mono text-[11px] text-(--ink-3) whitespace-nowrap"
      >
        {`${fmt(elapsed)} / ${fmt(total)}`}
      </div>

      <div
        className="col-span-full h-0.5 bg-(--rule) rounded-[1px] overflow-hidden mt-1.5"
      >
        <div
          className="h-full bg-(--accent) rounded-[1px] [transition:width_1s_linear]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </>
  );

  const gridClasses =
    "group mt-9 pt-6 border-t border-(--rule) grid grid-cols-[44px_1fr_auto] gap-3.5 items-center";

  const motionProps = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.36, ease: [0.4, 0, 0.2, 1] as const },
  };

  if (spotify.track_id) {
    return (
      <motion.a
        {...motionProps}
        href={`https://open.spotify.com/track/${spotify.track_id}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`open ${spotify.song} by ${spotify.artist} on spotify`}
        className={`${gridClasses} no-underline focus-visible:outline-none`}
      >
        {body}
      </motion.a>
    );
  }

  return (
    <motion.div
      {...motionProps}
      aria-label={`now playing: ${spotify.song} by ${spotify.artist}`}
      className={gridClasses}
    >
      {body}
    </motion.div>
  );
}
