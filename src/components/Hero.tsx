import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
        {/* Sol Kolon: görsel ağırlıklı hero */}
        <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl border border-border sm:aspect-[16/11] lg:aspect-auto lg:h-[560px]">
          <Image
            src="/images/kirinti-hero-pan.png"
            alt="Dere yatağında altın arama panı içinde parlayan altın parçacıkları"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pb-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Türkiye&apos;nin saha ve jeoloji platformu
            </span>

            <h1 className="text-balance relative mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              KIRINTI ALTIN
              <br />
              <span className="text-accent">ARAŞTIRMANIN</span> YENİ YOLU
            </h1>

            <p className="text-balance relative mt-5 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              Doğru yerleri keşfet, kaynaklı veriyi incele, kendi saha
              notlarını gizlice kaydet ve deneyimini toplulukla paylaş.
            </p>

            <div className="relative mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/harita"
                className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
              >
                Haritayı İncele
              </Link>
              <Link
                href="/kesifler"
                className="rounded-full border border-white/30 bg-black/30 px-7 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/50"
              >
                Keşiflerim 🔒
              </Link>
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Türkiye Potansiyel Altın Haritası vitrini */}
        <Link
          href="/harita"
          className="group flex aspect-[4/3] flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-colors hover:border-accent/40 sm:aspect-[16/11] lg:aspect-auto lg:h-[560px]"
        >
          <div className="flex items-center justify-between gap-3 px-6 pb-3 pt-5 sm:px-8 sm:pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Türkiye Potansiyel Altın Haritası
            </h2>
            <span className="shrink-0 text-xs font-medium text-accent transition-colors group-hover:text-accent-strong">
              Haritayı Aç &rarr;
            </span>
          </div>

          <div className="relative mx-4 mb-4 flex-1 overflow-hidden rounded-2xl border border-border bg-[#080b0f] p-1 sm:mx-6 sm:mb-6 sm:p-2">
            <Image
              src="/images/turkiye-altin-haritasi-preview-v3.png"
              alt="Türkiye potansiyel altın haritası önizlemesi, renkli jeolojik kayıt noktalarıyla"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain object-center"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
