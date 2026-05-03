type Role = {
  company: string,
  title: string,
  start: string,
  end: string,
  type: string[],
  description: string,
  stack: string[],
};

const roles: Role[] = [
  {
    company: "incubator",
    title: "software engineer",
    start: "jul 2024",
    end: "present",
    type: ["remote", "full-time"],
    description:
      "building digital products with startups — shipping web apps end-to-end, from product discovery and architecture through to deployment and scaling. leading maintenance and development of an e-commerce platform based in the US.",
    stack: ["ai", "engineering", "backend", "frontend", "typescript", "node", "postgres", "sql", "docker", "ci/cd", "cloud", "agile"],
  },
  {
    company: "universidad nacional del comahue",
    title: "software engineering student",
    start: "jul 2021",
    end: "dec 2023",
    type: ["hybrid", "full-time"],
    description:
      "while studying for my bachelor's in software and web development, i developed and maintained web applications for my university career. worked across the front and back end, owning small features end-to-end.",
    stack: ["react", "laravel", "mysql", "php", "tailwind", "figma", "design systems"],
  },
];

export function CareerList() {
  return (
    <div>
      {roles.map((role, i) => (
        <div
          key={role.company}
          className={`py-4.5 border-t border-(--rule) grid grid-cols-[1fr_auto] gap-y-1 gap-x-[18px]${i === roles.length - 1 ? " border-b" : ""}`}
        >
          {/* company */}
          <div
            className="text-sm font-medium text-(--ink) tracking-[-0.005em]"
          >
            {role.company}
          </div>

          {/* date range */}
          <div
            className="font-mono text-[11px] text-(--ink-3) self-center whitespace-nowrap"
          >
            {role.start} — {role.end}
          </div>

          {/* title + chips */}
          <div
            className="col-span-full flex items-center flex-wrap gap-2 text-(--ink-2) text-[13px] mt-0.5"
          >
            <span>{role.title}</span>
            <span className="text-(--ink-3)">·</span>
            {role.type.map((t) => (
              <span key={t} className="inline-flex items-center py-0.5 px-2 rounded-full bg-(--chip-bg) border border-(--rule) text-(--ink-2) text-[11px]">{t}</span>
            ))}
          </div>

          {/* description */}
          <p
            className="col-span-full text-(--ink-2) text-[13px] m-0 mt-2.5 max-w-[56ch]"
          >
            {role.description}
          </p>

          {/* stack tags */}
          <div
            className="col-span-full flex flex-wrap gap-1.5 mt-3"
          >
            {role.stack.map((tag) => (
              <span key={tag} className="font-mono text-[10.5px] text-(--ink-3) py-0.5 px-1.75 border border-(--rule) rounded-[3px] bg-transparent">{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
