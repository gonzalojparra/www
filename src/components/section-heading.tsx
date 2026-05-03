import type { ReactNode } from "react"

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-sans text-[13px] font-medium text-(--ink) m-0 mb-7 tracking-[-0.005em]"
    >
      <span
        aria-hidden="true"
        className="text-(--hash) font-mono font-normal tracking-[-0.02em]"
      >
        {"### "}
      </span>
      {children}
    </h2>
  )
}
