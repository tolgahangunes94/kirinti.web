const FEATURES = [
  {
    title: "Bilgi Paylaşımı",
    description:
      "Deneyimli madencilerin rehberliğinde güncel yöntemleri, ekipman önerilerini ve saha bilgilerini keşfet.",
    icon: (
      <path d="M4 4h9l3 3v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
    ),
  },
  {
    title: "Aktif Topluluk",
    description:
      "Aynı tutkuyu paylaşan yüzlerce madenciyle bağlantı kur, sorularına anında yanıt bul.",
    icon: <path d="M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM2 15c.5-2.5 2.2-4 4-4s3.5 1.5 4 4M10 15c.5-2.5 2.2-4 4-4s3.5 1.5 4 4" />,
  },
  {
    title: "Güvenilir Kaynaklar",
    description:
      "Doğrulanmış içerikler ve şeffaf tartışmalarla doğru kararlar almana yardımcı oluyoruz.",
    icon: <path d="M10 2 3 5v4c0 4.4 3 8 7 9 4-1 7-4.6 7-9V5l-7-3Zm-1.5 9L6 8.5l1-1 1.5 1.5L13 5.5l1 1L8.5 11Z" />,
  },
  {
    title: "Bölgesel Ağ",
    description:
      "Türkiye genelindeki saha ve bölge bazlı gruplarla yerel deneyimleri ve fırsatları takip et.",
    icon: <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />,
  },
];

export default function Features() {
  return (
    <section id="ozellikler" className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Neden Kırıntı Madencilik?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Sahadaki gerçek deneyimi dijital bir topluluğa taşıyoruz.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
