"use client"

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col justify-center">
      <h1
        className="text-[24px] font-semibold tracking-[-0.02em] text-(--ink) m-0 mb-3"
      >
        something broke
      </h1>
      <p className="text-(--ink-2) m-0 mb-6 text-sm">
        an unexpected error occurred. you can try again, or head back home.
      </p>
      <button
        type="button"
        onClick={reset}
        className="appearance-none self-start border border-(--rule) bg-(--bg) text-(--ink-2) font-sans text-xs py-1.75 px-3 rounded-md cursor-pointer [transition:all_var(--t-fast)] hover:text-(--accent) hover:border-(--accent)"
      >
        try again
      </button>
    </main>
  );
}
