function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
    </svg>
  );
}

const VALUES = [
  {
    title: "Araştır",
    description: "Kaynaklı jeolojik verileri incele.",
    icon: (
      <Icon>
        <circle cx="8.5" cy="8.5" r="5.5" />
        <path d="m17 17-4.3-4.3" />
      </Icon>
    ),
  },
  {
    title: "Öğren",
    description: "Rehber içerikleriyle bilgini geliştir.",
    icon: (
      <Icon>
        <path d="M4 4h9l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      </Icon>
    ),
  },
  {
    title: "Kaydet",
    description: "Kişisel keşiflerini gizlice sakla.",
    icon: (
      <Icon>
        <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
        <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
      </Icon>
    ),
  },
  {
    title: "Paylaş",
    description: "Deneyimini toplulukla paylaş.",
    icon: (
      <Icon>
        <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 15c.5-2.5 2.2-4 4-4s3.5 1.5 4 4M10 15c.5-2.5 2.2-4 4-4s3.5 1.5 4 4" />
      </Icon>
    ),
  },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-surface px-5 py-10 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
        {VALUES.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
              {item.icon}
            </span>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs leading-snug text-muted sm:text-sm">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
