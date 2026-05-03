import Link from "next/link"
import { SiteNav } from "@/components/site-nav"

export function SiteHeader() {
  return (
    <header
      className="pt-9 pb-14 flex items-center justify-between"
    >
      <Link
        href="/"
        aria-label="home"
        className="font-mono text-sm text-(--ink) no-underline tracking-[-0.02em] [transition:color_var(--t-fast)] hover:text-(--accent)"
      >
        @
      </Link>
      <SiteNav />
    </header>
  )
}
