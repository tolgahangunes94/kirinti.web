import Link from "next/link";

const TOOLS = [
  {
    title: "Kaynaklı Altın Haritası",
    description:
      "MTA ve teknik kaynaklardan derlenen jeolojik bölgeleri kategori ve il bazında incele.",
    href: "/harita",
    cta: "Haritayı İncele →",
    icon: (
      <path d="M10 2 3 5v4c0 4.4 3 8 7 9 4-1 7-4.6 7-9V5l-7-3Zm-1.5 9L6 8.5l1-1 1.5 1.5L13 5.5l1 1L8.5 11Z" />
    ),
  },
  {
    title: "Keşiflerim 🔒",
    description:
      "Saha noktalarını, notlarını, koordinatlarını ve fotoğraflarını yalnızca kendin için sakla.",
    href: "/kesifler",
    cta: "Kişisel Günlüğe Git →",
    icon: (
      <>
        <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
        <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
      </>
    ),
  },
  {
    title: "Saha Rehberi",
    description:
      "Kuvars, siyah kum, dere yapısı, taban kayası ve panlama mantığını pratik şekilde öğren.",
    href: "/rehber",
    cta: "Rehberi Aç →",
    icon: <path d="M4 4h9l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />,
  },
  {
    title: "Topluluk",
    description:
      "Gönderi paylaş, yorum yap ve diğer kullanıcıların saha deneyimlerini incele.",
    href: "/",
    cta: "Gönderileri Gör →",
    icon: <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 15c.5-2.5 2.2-4 4-4s3.5 1.5 4 4M10 15c.5-2.5 2.2-4 4-4s3.5 1.5 4 4" />,
  },
];

export default function Features() {
  return (
    <section id="araclar" className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Platformun Gerçek Araçları
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Araştırma, kayıt ve saha deneyimini tek yerde birleştiren dört
            temel modül.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
                  {tool.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{tool.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {tool.description}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">
                {tool.cta}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
