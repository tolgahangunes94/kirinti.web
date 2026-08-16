import SidebarProfileCard from "@/components/SidebarProfileCard";

type IconProps = {
  children: React.ReactNode;
};

function Icon({ children }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href?: string;
  comingSoon?: boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Keşfet & Saha",
    items: [
      {
        label: "Harita & Bölgeler",
        href: "/harita",
        icon: (
          <Icon>
            <path d="M2 5.5 7 4l6 2 5-1.5v10L13 16l-6-2-5 1.5v-10Z" />
            <path d="M7 4v10M13 6v10" />
          </Icon>
        ),
      },
      {
        label: "Saha Rehberi",
        href: "/rehber",
        icon: (
          <Icon>
            <path d="M2 15.5 7 6l3 5 2-3 6 7.5H2Z" />
          </Icon>
        ),
      },
      {
        label: "Keşif Kayıtları",
        href: "/kesifler",
        icon: (
          <Icon>
            <path d="M5 2.5h8a1 1 0 0 1 1 1V17l-5-2.5L4 17V3.5a1 1 0 0 1 1-1Z" />
          </Icon>
        ),
      },
    ],
  },
  {
    title: "Topluluk",
    items: [
      {
        label: "Akış & Gönderiler",
        href: "/",
        icon: (
          <Icon>
            <path d="M3 4h14v9H8l-4 3v-3H3V4Z" />
          </Icon>
        ),
      },
    ],
  },
  {
    title: "Ekipman",
    items: [
      {
        label: "Ekipman Kataloğu",
        comingSoon: true,
        icon: (
          <Icon>
            <path d="M2.5 6 10 2.5 17.5 6 10 9.5 2.5 6Z" />
            <path d="M2.5 6v8L10 17.5m0-8v8m7.5-11.5v8L10 17.5" />
          </Icon>
        ),
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-0 z-30 hidden w-64 flex-col overflow-y-auto border-r border-border bg-surface md:flex">
      <SidebarProfileCard />

      <nav className="flex-1 space-y-6 p-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {group.title}
            </h3>
            <ul className="mt-2 space-y-0.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  {item.comingSoon ? (
                    <span
                      aria-disabled="true"
                      className="flex cursor-default items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted/60"
                    >
                      <span className="text-accent/40">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                      <span className="ml-auto shrink-0 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-muted">
                        Yakında
                      </span>
                    </span>
                  ) : (
                    <a
                      href={item.href ?? "#"}
                      className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                    >
                      <span className="text-accent/70">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
