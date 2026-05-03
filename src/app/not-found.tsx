import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <h1
        className="text-[48px] font-semibold tracking-[-0.02em] text-(--ink) m-0 mb-4"
      >
        404
      </h1>
      <p className="text-(--ink-2) m-0 mb-6">
        congratulations! you found a page that doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center py-1.5 px-3 border border-(--rule) rounded-md text-xs text-(--ink) no-underline [transition:border-color_var(--t-fast),color_var(--t-fast)] hover:border-(--accent) hover:text-(--accent)"
      >
        go back home
      </Link>
    </PageWrapper>
  );
}
