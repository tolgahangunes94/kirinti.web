import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Dere Kıvrımlarında Altın Nasıl Birikir?";
const PAGE_DESCRIPTION =
  "İç virajlarda altının neden biriktiğini, sahada nelere dikkat edileceğini ve doğru numune alma tekniğini anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/dere-kivrimlarinda-altin";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/dere-kivrimlarinda-altin",
  },
};

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
};

function BackToGuideLink() {
  return (
    <Link
      href="/rehber"
      className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4 6 10l6 6" />
      </svg>
      Saha Rehberi&apos;ne dön
    </Link>
  );
}

export default function DereKivrimlarindaAltinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <BackToGuideLink />

        <span className="mt-6 inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          Dere Mantığı &amp; Kapanlar
        </span>

        <h1 className="text-balance mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Dere Kıvrımlarında Altın Nasıl Birikir?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Bir dere yatağının en verimli noktalarından biri, gözle bile fark
          edilebilecek kadar basit bir ipucuyla bulunur: kıvrımın iç tarafı.
          Akıntı bir virajı dönerken dış kenarda hızlanıp kıyıyı aşındırırken,
          iç kenarda yavaşlar ve taşıdığı yükü bırakmaya başlar. Bu sayfa, bu
          basit fiziksel kuralın sahada nasıl bir altın birikimine
          dönüştüğünü, nereye bakman ve nasıl numune alman gerektiğini adım
          adım anlatıyor.
        </p>

        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/dere-kivrimlarinda-altin-hero.png"
            alt="Bir dere yatağının iç virajında akıntının yavaşlayıp ağır mineralleri biriktirdiği bölgeyi gösteren şematik görsel"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Neden Burada Birikir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir akarsu, taşıdığı malzemeyi hızına orantılı bir güçle taşır.
            Kıvrımın dış tarafında su sıkışıp hızlanırken enerjisi artar ve
            tabanı aşındırır; iç tarafta ise aynı su daha geniş bir alana
            yayılarak yavaşlar. Yavaşlayan suyun taşıma kapasitesi düşer ve
            önce en ağır parçacıklar — altın, manyetit, ilmenit gibi yüksek
            özgül ağırlıklı mineraller — dibe çökmeye başlar. Bu tesadüfi bir
            birikim değil, akışkanlar mekaniğinin doğrudan sonucudur: aynı
            mantık, virajın çıkışına yakın, akıntının tekrar hızlanmaya
            başladığı ama henüz tam güce ulaşmadığı dar bir kuşakta da
            tekrarlanır ve burada genellikle en kalın çakıl birikintisi
            oluşur.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Zamanla bu düşük enerjili bölgede üst üste binen tortu katmanları
            arasında bir &quot;yüksek su izi&quot; oluşur — sık sık taşınan
            hafif malzemenin geride bıraktığı, gözle seçilebilir bir çizgi.
            Deneyimli arayıcılar bu çizginin hemen altını, zenginleşmiş bir
            birikim bandının başlangıcı olarak değerlendirir.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kıvrımın iç tarafında, akıntının görünür şekilde yavaşladığı
              geniş ve sığ kesim.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çakıl birikintisinin diğer noktalara göre gözle görülür şekilde
              kalınlaştığı yer — genelde virajın çıkışına yakın.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Yüzeydeki en iri, en ağır taşların toplandığı &quot;yüksek su
              izi&quot; çizgisi; bu çizginin hemen altı öncelikli bir
              noktadır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Virajın hemen arkasında kalan, girdaba yakın sakin cepler.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Varsa yüzeye çıkan taban kayası parçaları — iç virajda taban
              kayasına erişmek dış virajdan çoğu zaman daha kolaydır.
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Numune Nasıl Alınır?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Yüzeydeki gevşek, hafif malzemeyi (kum, ince çakıl) kenara
              ayır; bu üst tabaka genellikle altın taşımaz.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              İç virajın birkaç farklı noktasından (üst, orta, çıkış) küçük
              ve eşit hacimli numuneler al — tek büyük numune yerine birkaç
              küçük numune, birikimin nerede yoğunlaştığını daha hızlı
              gösterir.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Her numuneyi ayrı ayrı panla ve panın dibinde kalan siyah kum
              miktarını karşılaştır; siyah kum arttıkça o noktanın altın
              taşıma olasılığı da artar.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              En yoğun siyah kum çıkan noktayı işaretle ve oradan
              derinleşerek, taban kayasına doğru ilerleyen daha büyük bir
              numune al.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Konum, derinlik ve siyah kum yoğunluğunu not et — aynı dereye
              tekrar geldiğinde bu notlar zaman kazandırır.
            </li>
          </ol>
        </section>

        <div className="mt-10 rounded-xl border-l-2 border-accent bg-surface-2 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Mevzuat ve İzin Notu
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Derede altın arama, bölgeye, arazi statüsüne ve kullanılan
            yönteme göre değişen izin/ruhsat gereklilikleri içerebilir. Bu
            sayfa hukuki tavsiye niteliği taşımaz — sahaya çıkmadan önce
            bulunduğun bölgedeki güncel mevzuatı ve gerekli izinleri ilgili
            resmi kurumlardan doğrulaman önerilir.
          </p>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <BackToGuideLink />
        </div>
      </main>
    </>
  );
}
