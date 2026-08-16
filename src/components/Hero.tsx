const LEGEND = [
  { label: "Çok Yüksek", color: "bg-red-500" },
  { label: "Yüksek", color: "bg-orange-500" },
  { label: "Orta", color: "bg-accent" },
  { label: "Düşük", color: "bg-green-500" },
  { label: "Veri Yok", color: "bg-zinc-500" },
];

const MAP_MARKERS = [
  { top: "28%", left: "38%", color: "bg-red-500" },
  { top: "44%", left: "58%", color: "bg-orange-500" },
  { top: "60%", left: "34%", color: "bg-accent" },
  { top: "70%", left: "55%", color: "bg-green-500" },
  { top: "38%", left: "70%", color: "bg-zinc-500" },
];

export default function Hero() {
  return (
    <section className="px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
        {/* Sol Kolon: Main Hero Banner */}
        <div className="bg-glow relative flex flex-col justify-center overflow-hidden rounded-3xl border border-border bg-surface px-6 py-14 sm:px-10 sm:py-16">
          <svg
            className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 text-accent/10"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <circle cx="50" cy="50" r="48" />
            <circle cx="50" cy="50" r="34" />
            <circle cx="50" cy="50" r="20" />
          </svg>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Türkiye&apos;nin madenci topluluğu
          </span>

          <h1 className="text-balance relative mt-6 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-accent">ALTINI KEŞFET</span>, DOĞAYI ANLA,
            DEĞERİ BUL.
          </h1>

          <p className="text-balance relative mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Türkiye&apos;nin dört bir yanındaki dereleri keşfet, bilgini
            paylaş, topluluğumuzla güçlen!
          </p>

          <div className="relative mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#topluluk"
              className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
            >
              Hemen Keşfet
            </a>
            <a
              href="#hakkinda"
              className="rounded-full border border-border bg-background px-7 py-3.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
            >
              Topluluğa Katıl
            </a>
          </div>
        </div>

        {/* Sağ Kolon: Potansiyel Altın Dere Haritası Widget */}
        <div className="flex flex-col rounded-3xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Potansiyel Altın Dere Haritası
            </h2>
            <a
              href="/harita"
              className="shrink-0 text-xs font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Tüm Harita &rarr;
            </a>
          </div>

          <div className="relative mt-5 flex-1 overflow-hidden rounded-2xl border border-border bg-surface-2">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="bg-glow absolute inset-0" />

            <div className="relative flex aspect-square w-full items-center justify-center sm:aspect-4/5">
              <svg
                width="120"
                height="120"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-border"
              >
                <path d="M10 2 2 6.5 10 11l8-4.5L10 2Z" />
                <path d="m2 10 8 4.5L18 10M2 13.5 10 18l8-4.5" />
              </svg>

              {MAP_MARKERS.map((marker, i) => (
                <span
                  key={i}
                  className={`absolute h-2.5 w-2.5 rounded-full ${marker.color} shadow-[0_0_0_4px_rgba(0,0,0,0.25)]`}
                  style={{ top: marker.top, left: marker.left }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {LEGEND.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-1.5 text-xs text-muted"
              >
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
