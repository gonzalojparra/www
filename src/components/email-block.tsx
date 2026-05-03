"use client"

import { useState } from "react";

const EMAIL = "gonzzaparra@gmail.com";

export function EmailBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  };

  return (
    <div
      className="mt-7 pt-4.5 px-4.5 pb-4 border border-(--rule) rounded-lg bg-[oklch(0.99_0.005_80)] grid grid-cols-[1fr_auto] items-center gap-3.5"
    >
      <div>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.08em] text-(--ink-3) mb-1"
        >
          email
        </div>
        <div
          className="font-mono text-[13px] text-(--ink) tracking-[-0.01em]"
        >
          {EMAIL}
        </div>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className={`appearance-none font-sans text-xs py-1.75 px-3 rounded-md cursor-pointer border [transition:all_var(--t-fast)] ${copied ? "border-(--accent) bg-(--accent-soft) text-(--accent)" : "border-(--rule) bg-(--bg) text-(--ink-2) hover:text-(--accent) hover:border-(--accent)"}`}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
