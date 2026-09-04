import { PageWrapper } from "@/components/page-wrapper";
import { NowPlaying } from "@/components/now-playing";

export default function HomePage() {
  return (
    <PageWrapper>
      {/* status pill */}
      <div
        className="inline-flex items-center gap-2 py-1.5 pr-3 pl-2.5 border border-(--rule) rounded-full text-xs text-(--ink-2) bg-(--bg) mb-5.5"
      >
        <span
          className="pill-dot w-1.5 h-1.5 rounded-full bg-(--accent) animate-[pulse-dot_2.4s_cubic-bezier(.4,0,.2,1)_infinite] shrink-0"
        />
        working on awesome ideas
      </div>

      {/* hero heading */}
      <h1
        className="font-sans text-[22px] font-semibold tracking-[-0.02em] m-0 mb-5.5 text-(--ink)"
      >
        {"hey, i'm "}
        <span
          className="font-accent italic font-normal text-[28px] tracking-[-0.01em] ml-0.5"
        >
          gonza
        </span>
      </h1>

      <p className="m-0 mb-4 text-(--ink-2)">
        {"software engineer, passionate about web technologies. currently working at "}
        <a
          href="https://incu.tech/en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--ink) no-underline border-b border-(--rule) [transition:border-color_var(--t-fast),color_var(--t-fast)] hover:border-(--accent) hover:text-(--accent)"
        >
          incu
        </a>
        {", a company that helps startups and other enterprises develop digital products and scale them."}
      </p>

      <p className="m-0 text-(--ink-2)">
        {"outside of programming, i enjoy listening to music — you might find what i'm currently listening to in real-time below. i'm also a huge football fan, and obviously, a "}
        <em
          className="font-accent italic font-normal text-[1.18em] tracking-normal text-(--ink)"
        >
          boca juniors
        </em>
        {" one."}
      </p>

      <NowPlaying />
    </PageWrapper>
  );
}
