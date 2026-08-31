import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Doğal Tuzak (Pothole) İçinde Altın Nasıl Birikir?";
const PAGE_DESCRIPTION =
  "Taban kayasındaki girdaplı pothole çukurlarının nasıl oluştuğunu, neden doğal bir altın kapanı işlevi gördüğünü ve sahada nasıl temizleneceğini anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/dogal-tuzak";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/dogal-tuzak",
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

export default function DogalTuzakPage() {
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
          Doğal Tuzak (Pothole) İçinde Altın Nasıl Birikir?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Taban kayasında sert bir çıkıntının etrafında yıllarca dönen bir
          girdap, zamanla neredeyse mükemmel dairesel bir çukur oyar. Sahada
          &quot;doğal tuzak&quot; ya da &quot;pothole&quot; olarak bilinen bu
          yapılar, hem girdap etkisiyle malzemeyi içeride tutar hem de yıllar
          boyunca biriken ağır mineralleri hapseder. Bu sayfa, bu çukurların
          nasıl oluştuğunu, neden bu kadar verimli olduğunu ve sahada nasıl
          bulunup temizleneceğini anlatıyor.
        </p>

        {/* Hero görsel — public/images/rehber/dogal-tuzak-hero.png */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/dogal-tuzak-hero.png"
            alt="Taban kayasında girdap etkisiyle oyulmuş, içinde kum döngüsü olan dairesel bir pothole çukurunu gösteren fotoğraf"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Doğal Tuzak Nedir, Neden Önemlidir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir akarsu yatağındaki taban kayasında küçük bir çukur veya
            pürüz, akan suda yerel bir girdap oluşturmaya yeter. Bu girdap
            içine giren küçük çakıllar, suyun döndürücü hareketiyle çukurun
            tabanında dönmeye devam eder ve zamanla kayayı aşındırarak çukuru
            derinleştirir — yıllar, hatta on yıllar içinde bu süreç neredeyse
            dairesel, kap gibi bir &quot;pothole&quot; oluşturur. Aynı girdap
            etkisi, içine giren ağır mineralleri de dışarı bırakmaz; çukur
            büyüdükçe doğal bir birikim kabına dönüşür.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Taban kayasında dairesel veya oval, düzgün kenarlı çukurlar —
              rastgele çatlaklardan farklı olarak belirgin bir girdap izi
              taşır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çukurun içinde hâlâ dönen veya döndüğü belli olan çakıl ve
              taşlar — aktif bir girdabın hâlâ çalıştığının işareti.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çukurun derinliği — derin bir pothole, sığ olana göre malzemeyi
              çok daha uzun süre tutar.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Akış yönüne göre potholeun ana akıntı hattı üzerinde mi yoksa
              kenarda mı olduğu — ana hat üzerindekiler genelde daha zengindir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çukurun dibindeki dolgu malzemesinin rengi — koyu, siyah kum
              ağırlıklı bir dolgu iyi bir işarettir.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altınla İlişkisi Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir pothole, aslında akarsuyun uzun yıllar boyunca kendi kendine
            işlettiği küçük bir doğal santrifüjdür: girdap içindeki dönme
            hareketi, tıpkı bir panlama işlemi gibi hafif malzemeyi yukarıda
            tutup ağır parçacıkları (altın ve siyah kum dahil) dibe çöktürür.
            Bu yüzden bir pothole&apos;u dibine kadar temizlemek, üzerindeki
            metrelerce düz dere yatağını numunelemekten çok daha yüksek
            verim sağlayabilir — tek bir zengin çukur, uzun bir günün
            karşılığını tek seferde verebilir.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Pothole Sahada Nasıl Temizlenir?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Çukurun içindeki büyük taş ve çakılları elle çıkararak dip
              malzemesine ulaş.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Kalan malzemeyi küçük bir kürek veya el aletiyle tamamen boşalt
              — dip köşelere sıkışmış ince malzemeyi de çıkarmaya özen göster.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Çıkardığın malzemeyi ayrı bir kapta topla — çevredeki düz dere
              yatağı malzemesiyle karıştırma.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Malzemeyi panla ve dipte kalan siyah kum ile altın miktarını
              değerlendir.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Zengin çıkan potholeun konumunu not et — aynı akış hattındaki
              benzer çukurlar genelde benzer sonuç verir.
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
              Sadece üstteki gevşek çakılı alıp çukurun dibine kadar
              inmemek — asıl birikim genelde en dipte, köşelerdedir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Küçük bir pothole&apos;u önemsememek — boyutu küçük olsa da
              derinliği ve yaşı verimini büyük ölçüde belirler.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çıkardığın dip malzemesini üstteki gevşek malzemeyle
              karıştırıp hangi katmanın ne kadar verdiğini ayırt edememek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Ana akış hattından uzak, düşük enerjili potholelara vakit
              harcayıp asıl verimli olanları atlamak.
            </li>
          </ul>
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

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            İlgili Rehberler
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/rehber/taban-kayasi-catlaklari"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Taban Kayası Çatlaklarında Altın Nasıl Sıkışır? →
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/dere-kivrimlarinda-altin"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Dere Kıvrımlarında Altın Nasıl Birikir? →
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
