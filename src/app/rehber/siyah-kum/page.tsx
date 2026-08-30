import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Siyah Kum Altına Nasıl İşaret Eder?";
const PAGE_DESCRIPTION =
  "Manyetit ve ilmenit içerikli siyah kumun ne olduğunu, altınla neden aynı noktalarda biriktiğini ve panındaki siyah kumu nasıl okuman gerektiğini anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/siyah-kum";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/siyah-kum",
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

export default function SiyahKumPage() {
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
          Jeoloji &amp; Kayaçlar
        </span>

        <h1 className="text-balance mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Siyah Kum Altına Nasıl İşaret Eder?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Bir panın dibinde kalan koyu, neredeyse simsiyah kum tabakası
          deneyimli arayıcılar için tesadüf değildir — doğanın kendi doğal
          ayıklama sürecinin sonucudur. Manyetit ve ilmenit gibi ağır demir
          mineralleri, tıpkı altın gibi yüksek özgül ağırlığa sahiptir ve
          akarsu tarafından benzer fiziksel koşullarda, benzer noktalarda
          biriktirilir. Bu sayfa, siyah kumun ne olduğunu, neden altınla aynı
          yerde bulunma eğiliminde olduğunu ve panındaki siyah kum miktarını
          nasıl okuman gerektiğini anlatıyor.
        </p>

        {/* Hero görsel — hedef dosya: public/images/rehber/siyah-kum-hero.png (henüz eklenmedi) */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/siyah-kum-hero.png"
            alt="Pan dibinde biriken koyu renkli manyetit ve ilmenit tanecikli siyah kum tabakasını gösteren şematik görsel"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Siyah Kum Nedir, Neden Önemlidir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Siyah kum çoğunlukla manyetit (demir oksit) ve ilmenit
            (demir-titanyum oksit) tanecikleri ile bazen granat ve hematit
            gibi diğer ağır minerallerin karışımından oluşur. Bu mineraller,
            çevrelerindeki kuvars ve feldspat gibi hafif kayaç parçalarına
            göre üç-beş kat daha yoğundur. Bir akarsu, taşıdığı malzemeyi
            ağırlığına göre ayrıştırır: en hafif parçacıklar akıntıyla uzağa
            taşınırken en ağır parçacıklar — altın ve siyah kum mineralleri —
            aynı düşük enerjili noktalarda birikir. Bu yüzden siyah kum,
            altının doğal yol arkadaşı olarak kabul edilir.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Panın dibinde kalan koyu gri-siyah, ince taneli kum tabakasının
              kalınlığı — kalınlaştıkça ağır mineral biriktirme kapasitesi de
              artar.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kumun mıknatısa güçlü şekilde yapışıp yapışmadığı — manyetit
              oranı yüksekse mıknatıs neredeyse tüm kumu çeker.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Siyah kumun yoğunlaştığı mikro-noktalar: iç virajlar, taban
              kayası çatlakları, büyük taşların hemen arkası.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Farklı derinliklerdeki tabakalarda siyah kum yoğunluğunun değişip
              değişmediği — daha derin, daha eski tabakalar genelde daha
              zengindir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kumun rengi ve parlaklığı — mat, koyu ve ince taneli kum genelde
              daha yüksek yoğunluklu mineral içeriğine işaret eder.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altınla İlişkisi Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Siyah kumun kendisi altın değildir ve bulunması altın garantisi
            vermez, ama ikisi neredeyse aynı fiziksel kurallara göre hareket
            ettiği için aralarında güçlü bir korelasyon vardır. Panlama
            sırasında siyah kum ne kadar geç ve zor ayrılıyorsa, aynı bölgede
            ince altının da benzer şekilde dipte tutunmuş olma ihtimali o
            kadar yüksektir. Deneyimli arayıcılar bu yüzden &quot;önce siyah
            kumu bul, altın zaten yakınındadır&quot; mantığıyla çalışır —
            siyah kum yoğunluğu düşükse, o noktada uzun süre ısrar etmek
            genelde verimsizdir.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Siyah Kum Nasıl Değerlendirilir?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Standart bir panlama yap ve pan dibinde kalan son tabakayı
              (siyah kum + varsa altın) ayrı bir kapta topla.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Güçlü bir mıknatısı bir poşetin içinden kuma yaklaştırarak
              manyetit kısmını ayır — mıknatısa yapışmayan koyu taneler
              genelde ilmenit veya granattır.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Ayrılan siyah kum miktarını farklı numune noktalarıyla
              karşılaştır; belirgin şekilde daha fazla çıkan noktayı
              işaretle.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Siyah kumun yoğun olduğu noktada daha büyük hacimli, daha derin
              bir numune alarak tekrar panla.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Sonuçları konum ve derinlik notlarıyla birlikte kaydet — aynı
              bölgeye tekrar döndüğünde referans noktası olarak kullan.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sık Yapılan Hatalar
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Siyah kum çıkmayan bir noktada ısrarla uzun süre panlamaya
              devam etmek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Mıknatısı doğrudan kuma değdirip sonra ayıklamaya çalışmak —
              poşet içinden yaklaştırmak hem daha temiz hem tekrar
              kullanılabilir bir yöntemdir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Siyah kum miktarını sadece görsel tahminle karşılaştırıp not
              almamak; zamanla hangi noktanın gerçekten daha zengin olduğunu
              unutmak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Az miktarda siyah kum görünce hemen o dere kesimini tamamen
              terk etmek — asıl karşılaştırma birden fazla noktadan
              yapılmalıdır.
            </li>
          </ul>
        </section>

        <div className="mt-10 rounded-xl border-l-2 border-accent bg-surface-2 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Mevzuat ve İzin Notu
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Sahada numune toplama ve arama, bölgeye, arazi statüsüne ve
            kullanılan yönteme göre değişen izin/ruhsat gereklilikleri
            içerebilir. Bu sayfa hukuki tavsiye niteliği taşımaz — sahaya
            çıkmadan önce bulunduğun bölgedeki güncel mevzuatı ve gerekli
            izinleri ilgili resmi kurumlardan doğrulaman önerilir.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            İlgili Rehberler
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/rehber/kuvars-damarlari"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Kuvars Damarlarında Altın Nasıl Aranır? →
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/taban-kayasi-catlaklari"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Taban Kayası Çatlaklarında Altın Nasıl Sıkışır? →
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <BackToGuideLink />
        </div>
      </main>
    </>
  );
}
