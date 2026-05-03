import { LocalClock } from "@/components/local-clock"

export function SiteFooter() {
  return (
    <footer
      className="pt-14 px-0 pb-7 flex items-center justify-between text-(--ink-3) text-[11px] tracking-[0.01em]"
    >
      <div className="font-sans font-normal">
        {"made with "}
        <span className="text-(--accent)" aria-label="love">
          ♥
        </span>
        {" by "}
        <span
          className="font-accent italic text-sm text-(--ink-2) ml-0.5"
        >
          Gonzalo Parra
        </span>
      </div>
      <LocalClock />
    </footer>
  )
}
