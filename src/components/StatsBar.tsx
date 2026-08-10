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

const STATS = [
  {
    value: "27.842",
    label: "Üye",
    icon: (
      <Icon>
        <circle cx="7" cy="6.5" r="2.5" />
        <path d="M2.5 16c.6-3 2.3-4.7 4.5-4.7s3.9 1.7 4.5 4.7" />
        <circle cx="14.5" cy="7" r="2" />
        <path d="M12.8 11.6c1.8.3 3.1 1.9 3.7 4.4" />
      </Icon>
    ),
  },
  {
    value: "5.963",
    label: "Gönderi",
    icon: (
      <Icon>
        <path d="M3 4h14v9H8l-4 3v-3H3V4Z" />
      </Icon>
    ),
  },
  {
    value: "1.250+",
    label: "Aktif Üye",
    icon: (
      <Icon>
        <path d="M11 2 4 12h5l-1 6 8-11h-5l0-5Z" />
      </Icon>
    ),
  },
  {
    value: "81",
    label: "Şehirde Keşif",
    icon: (
      <Icon>
        <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
      </Icon>
    ),
  },
  {
    value: "214",
    label: "Doğrulanmış Bölge",
    icon: (
      <Icon>
        <path d="M10 2.5 12 4l2.4-.4.9 2.3L17 7l-1 2.2L17 11.5l-1.7 1.1-.9 2.3-2.4-.4-2 1.5-2-1.5-2.4.4-.9-2.3L3 13.5 4 11.3 3 9l1.7-1.1.9-2.3L8 6 10 2.5Z" />
        <path d="m7.5 10 1.8 1.8 3.2-3.6" />
      </Icon>
    ),
  },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-surface px-5 py-10 sm:px-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-5 md:gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              {stat.icon}
            </span>
            <span className="text-xl font-semibold text-foreground sm:text-2xl">
              {stat.value}
            </span>
            <span className="text-xs text-muted sm:text-sm">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
