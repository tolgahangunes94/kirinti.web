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
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Keşfet",
    items: [
      {
        label: "Potansiyel Altın Haritası",
        href: "/harita",
        icon: (
          <Icon>
            <path d="M2 5.5 7 4l6 2 5-1.5v10L13 16l-6-2-5 1.5v-10Z" />
            <path d="M7 4v10M13 6v10" />
          </Icon>
        ),
      },
      {
        label: "Bölgeler",
        icon: (
          <Icon>
            <path d="M10 2 2 6.5 10 11l8-4.5L10 2Z" />
            <path d="m2 10 8 4.5L18 10M2 13.5 10 18l8-4.5" />
          </Icon>
        ),
      },
      {
        label: "Keşif Kayıtları",
        icon: (
          <Icon>
            <path d="M5 2.5h8a1 1 0 0 1 1 1V17l-5-2.5L4 17V3.5a1 1 0 0 1 1-1Z" />
          </Icon>
        ),
      },
      {
        label: "Jeoloji Rehberi",
        icon: (
          <Icon>
            <path d="M2 15.5 7 6l3 5 2-3 6 7.5H2Z" />
          </Icon>
        ),
      },
      {
        label: "Altın Rehberi",
        icon: (
          <Icon>
            <circle cx="10" cy="10" r="7" />
            <path d="M10 6.5 11.2 9l2.6.3-1.9 1.8.5 2.6L10 12.4l-2.4 1.3.5-2.6-1.9-1.8L8.8 9 10 6.5Z" />
          </Icon>
        ),
      },
    ],
  },
  {
    title: "Topluluk",
    items: [
      {
        label: "Sohbet & Gönderiler",
        icon: (
          <Icon>
            <path d="M3 4h14v9H8l-4 3v-3H3V4Z" />
          </Icon>
        ),
      },
      {
        label: "Sorular",
        icon: (
          <Icon>
            <circle cx="10" cy="10" r="7.5" />
            <path d="M8 8a2 2 0 1 1 3 1.7c-.7.4-1 .8-1 1.6" />
            <path d="M10 14.2v.1" />
          </Icon>
        ),
      },
      {
        label: "Popüler Konular",
        icon: (
          <Icon>
            <path d="M10 2c2 3-2 4-1 7 .5 1.5 2 2 2.5 3.5.6 1.9-.5 4-3 4.5-3 .6-5.5-1.5-5.5-4.5 0-2 1.2-3 2-4.5C6 6 7.5 3.5 10 2Z" />
          </Icon>
        ),
      },
      {
        label: "Takip Edilenler",
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
        label: "Son Aktiviteler",
        icon: (
          <Icon>
            <circle cx="10" cy="10" r="7.5" />
            <path d="M10 5.5V10l3 2" />
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
        icon: (
          <Icon>
            <path d="M2.5 6 10 2.5 17.5 6 10 9.5 2.5 6Z" />
            <path d="M2.5 6v8L10 17.5m0-8v8m7.5-11.5v8L10 17.5" />
          </Icon>
        ),
      },
      {
        label: "İkinci El Pazarı",
        icon: (
          <Icon>
            <path d="M3 6h14l-1 9.5a1 1 0 0 1-1 .9H5a1 1 0 0 1-1-.9L3 6Z" />
            <path d="M7 6V5a3 3 0 0 1 6 0v1" />
          </Icon>
        ),
      },
      {
        label: "Ekipman İncelemeleri",
        icon: (
          <Icon>
            <path d="M10 3 11.6 6.6l3.9.4-2.9 2.7.8 3.9L10 11.7l-3.4 1.9.8-3.9-2.9-2.7 3.9-.4L10 3Z" />
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
                  <a
                    href={item.href ?? "#"}
                    className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <span className="text-accent/70">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
