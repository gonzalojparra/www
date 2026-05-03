type Channel = {
  name: string,
  handle: string,
  href: string,
  icon: React.ReactNode,
};

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
    <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19 5.77 5.07 5.07 0 0 0 18.91 2S17.73 1.65 15 3.48a13.38 13.38 0 0 0-7 0C5.27 1.65 4.09 2 4.09 2A5.07 5.07 0 0 0 4 5.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8 19.13V23" />
  </svg>
);

const XIcon = ({ ...props }) => {
  return (
    <svg
      {...props}
      fill='currentColor'
      height='16'
      preserveAspectRatio='xMidYMid'
      viewBox='0 0 16 16'
      width='16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z' />
    </svg>
  );
};

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
    <rect x="2.5" y="2.5" width="19" height="19" rx="2" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-4 h-4">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const channels: Channel[] = [
  {
    name: "github",
    handle: "@gonzalojparra",
    href: "https://github.com/gonzalojparra",
    icon: <GitHubIcon />,
  },
  {
    name: "twitter (x)",
    handle: "@_gonzaparra",
    href: "https://x.com/_gonzaparra",
    icon: <XIcon />,
  },
  {
    name: "linkedin",
    handle: "/in/gonzalojparra",
    href: "https://linkedin.com/in/gonzalojparra",
    icon: <LinkedInIcon />,
  },
  {
    name: "message",
    handle: "direct chat",
    href: "mailto:gonzzaparra@gmail.com",
    icon: <MessageIcon />,
  },
];

export function Channels() {
  return (
    <div className="mt-7 border-t border-(--rule)">
      {channels.map((ch) => (
        <a
          key={ch.name}
          href={ch.href}
          target={ch.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={ch.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="channel-row group grid grid-cols-[22px_1fr_auto_auto] gap-3.5 items-center border-b border-(--rule) text-(--ink) no-underline"
        >
          <span
            className="text-(--ink-2) [transition:color_var(--t-fast)] group-hover:text-(--accent)"
          >
            {ch.icon}
          </span>
          <span className="text-sm text-(--ink)">{ch.name}</span>
          <span
            className="font-mono text-[11.5px] text-(--ink-3)"
          >
            {ch.handle}
          </span>
          <span
            className="font-mono text-[13px] text-(--ink-3) [transition:transform_var(--t-fast),color_var(--t-fast)] group-hover:translate-x-0.5 group-hover:text-(--accent)"
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
