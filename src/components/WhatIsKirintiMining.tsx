import Image from "next/image";
import Link from "next/link";

export default function WhatIsKirintiMining() {
  return (
    <section className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
            Hobi / Saha Faaliyeti
          </span>

          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Kırıntı Madencilik Nedir?
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Kırıntı madencilik; dere, akarsu ve eski alüvyon yataklarında
            doğal süreçlerle taşınarak biriken altın ve diğer ağır
            minerallerin araştırılması ve ayrıştırılmasıyla ilgilenen bir
            saha faaliyetidir. Pan, elek ve savak gibi ekipmanların yanında
            dere yapısını, siyah kumu, taban kayasını ve akış dinamiklerini
            anlamak bu hobinin temelini oluşturur.
          </p>

          <Link
            href="/rehber"
            className="mt-5 inline-block text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
          >
            Kırıntı Madencilik Rehberini İncele →
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-[3/2] w-full bg-surface-2 md:aspect-auto md:h-full md:min-h-[320px]">
              <Image
                src="/images/kirintimadencilik-platform.jpeg"
                alt="KırıntıMadencilik.com platform konsepti"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-contain p-3"
              />
            </div>

            <div className="min-w-0 p-6 sm:p-8">
              <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted">
                Platform / Marka
              </span>

              <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                KırıntıMadencilik.com Nedir?
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                KırıntıMadencilik.com, kırıntı madenciliğine, altın aramaya ve
                saha araştırmalarına ilgi duyanlar için oluşturulmuş bağımsız
                bir bilgi ve topluluk platformudur. Kaynaklı jeolojik
                verileri, Türkiye potansiyel altın haritasını, kişisel saha
                kayıtlarını, rehber içeriklerini ve gerçek kullanıcı
                deneyimlerini tek yerde buluşturur.
              </p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-accent">
                Araştır · Öğren · Kaydet · Paylaş
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
