import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Hematit ve Limonit Alterasyonu Altına Nasıl İşaret Eder?";
const PAGE_DESCRIPTION =
  "Kırmızı-kahverengi 'pas' renkli hematit ve limonit alterasyon bölgelerinin ne anlama geldiğini, sahada nasıl takip edileceğini ve altın mineralizasyonuyla ilişkisini anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/hematit-limonit";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/hematit-limonit",
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

export default function HematitLimonitPage() {
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
          Hematit ve Limonit Alterasyonu Altına Nasıl İşaret Eder?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Bir dere kenarında veya yamaçta karşılaşılan kırmızımsı-kahverengi
          &quot;pas&quot; renkli kayaçlar, tesadüfi bir renk değişimi değildir
          — genellikle yerin altında bir zamanlar aktif olmuş bir sülfür
          sisteminin yüzeydeki izidir. Bu sayfa, hematit ve limonit
          alterasyonunun ne olduğunu, sahada bu rengi nasıl takip edeceğini ve
          altın mineralizasyonuyla nasıl bir ilişkisi olduğunu anlatıyor.
        </p>

        {/* Hero görsel — public/images/rehber/hematit-limonit-hero.png */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/hematit-limonit-hero.png"
            alt="Dere kenarında kırmızı-kahverengi hematit/limonit oksidasyonu ile kaplı kayaçları gösteren fotoğraf"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Hematit / Limonit Alterasyonu Nedir, Neden Önemlidir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Yerkabuğunun derinliklerinde oluşan pirit gibi sülfür mineralleri,
            zamanla yüzeye çıktığında hava ve suyla temas ederek oksitlenir.
            Bu oksitlenme sürecinin ürünleri hematit (parlak kırmızı) ve
            limonit&apos;tir (donuk sarı-kahve); ikisi birlikte sahada
            &quot;gossan&quot; olarak bilinen pas renkli bir zon oluşturur.
            Gossan, aslında artık orada bulunmayan sülfür mineralinin geride
            bıraktığı bir imzadır — ve bu sülfürler genellikle altın, gümüş
            gibi değerli metalleri de beraberinde taşımıştır.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bu yüzden bir gossan bölgesi bulmak, &quot;burada bir zamanlar
            aktif bir hidrotermal sistem vardı&quot; diyen dolaylı ama güçlü
            bir jeolojik ipucudur — asıl iş, bu izi kaynağına kadar takip
            edebilmektir.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kayaç yüzeyinde parlak kırmızı (hematit) veya donuk
              sarı-kahverengi (limonit) renk değişimi — özellikle taze kırık
              yüzeyde bile devam eden renklenme.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kayacın gözenekli, süngerimsi bir doku kazanmış olması — çözünüp
              gitmiş pirit kristallerinin geride bıraktığı boşluklar.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Renklenmenin yamaç boyunca yoğunlaştığı veya azaldığı yön —
              yoğunluğun arttığı taraf kaynağa daha yakındır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Pas renkli bölgenin kuvars damarlarıyla birlikte görülüp
              görülmediği — ikisinin bir arada bulunması potansiyeli
              güçlendirir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Dere suyunun kendisinde veya kum tabakasında görülen turuncu-kızıl
              tortu — membada aktif bir oksidasyon kaynağının işareti.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altınla İlişkisi Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Hematit ve limonitin kendisi altın içermez, ama oluştukları
            sülfür sistemleri sıklıkla altını da beraberinde taşımıştır.
            Sülfür mineralleri (özellikle pirit) çözünüp oksitlenirken içine
            hapsolmuş ince altın taneleri serbest kalabilir ve gossan
            bölgesinin hemen etrafına, dere yatağına veya taban kayasındaki
            çatlaklara taşınabilir. Bu yüzden deneyimli arayıcılar için bir
            gossan zonu, &quot;burayı numunele&quot; diyen doğal bir işaret
            levhası niteliğindedir.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Gossan Bölgesi Sahada Nasıl Değerlendirilir?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Pas renkli bölgenin sınırlarını yamaç boyunca takip ederek
              renklenmenin en yoğun olduğu noktayı belirle.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Bu noktadan bir örnek kırıp taze kırık yüzeyde gözenek ve sülfür
              kalıntısı izi olup olmadığını incele.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Gossan zonunun hemen altındaki veya aşağı akış yönündeki dere
              tortusundan bir numune al.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Numuneyi panla ve dipte kalan siyah kum ile birlikte altın
              izine bak.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Sonuçları gossan zonunun konumu ve büyüklüğüyle birlikte not et;
              geniş ve yoğun bir zon daha uzun süreli araştırmayı hak eder.
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
              Her kırmızımsı kayacı gossan sanıp sıradan demir lekeli
              yüzeyeyle karıştırmak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Gossan bölgesini bulup hiç numune almadan, sadece görünüşüne
              güvenerek geçip gitmek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Renklenmenin yönünü takip etmeden rastgele nokta seçmek —
              kaynağa giden yön genelde net bir şekilde izlenebilir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Küçük bir gossan izini önemsememek — bazı en zengin
              mineralizasyonlar yüzeyde çok dar bir alanda görünür.
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
                href="/rehber/siyah-kum"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Siyah Kum Altına Nasıl İşaret Eder? →
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
