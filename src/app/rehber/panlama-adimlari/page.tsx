import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Doğru Panlama Adım Adım Nasıl Yapılır?";
const PAGE_DESCRIPTION =
  "Bir numuneyi pandan alıp dipte sadece siyah kum ve altının kaldığı son aşamaya kadar izlenmesi gereken adımları ve sık yapılan hataları anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/panlama-adimlari";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/panlama-adimlari",
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

export default function PanlamaAdimlariPage() {
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
          Saha Teknikleri
        </span>

        <h1 className="text-balance mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Doğru Panlama Adım Adım Nasıl Yapılır?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Panlama, kırıntı madenciliğinin en temel ve en ucuz doğrulama
          yöntemidir — ama tekniği doğru uygulanmazsa, panın dibinde gerçekten
          bulunan ince altın bile suyla birlikte kayıp gidebilir. Bu sayfa,
          bir numuneyi pandan alıp dipte sadece siyah kum ve altının kaldığı
          son aşamaya kadar izlenmesi gereken adımları ve bu süreçte en sık
          yapılan hataları anlatıyor.
        </p>

        {/* Hero görsel — hedef dosya: public/images/rehber/panlama-adimlari-hero.png (henüz eklenmedi) */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/panlama-adimlari-hero.png"
            alt="Bir altın panının su içinde dairesel hareketle çalkalanarak ağır minerallerin dipte biriktirilmesini gösteren şematik görsel"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Panlama Nedir, Neden Bu Kadar Kritiktir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Panlama, yerçekimi ve su yardımıyla ağır mineralleri (altın, siyah
            kum) hafif malzemeden (kum, çakıl, kil) ayırma işlemidir. Prensip
            basittir: pan hafifçe sallandığında ağır parçacıklar dibe çöker,
            hafif parçacıklar ise yüzeye çıkar ve suyla birlikte kenarlardan
            dökülebilir. Ancak bu denge çok hassastır — çok agresif çalkalama
            ince ve pul altını da hafif malzemeyle birlikte kaybettirirken,
            çok yavaş ve temkinli çalışma ise gereksiz yere zaman kaybettirir.
            Doğru teknik, bu ikisi arasındaki dengeyi bulmaktır.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Panlamaya Başlamadan Önce Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Numunenin büyük taş ve çakıllardan arındırılmış olması — elle
              veya kaba bir elekle büyük parçaları ayıkla, panın kapasitesini
              boşa harcama.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Panın yeterince su altında, düz ve sabit tutulabileceği bir
              çalışma alanı seçilmesi.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kilin iyice dağıtılmış olması — sıkışmış kil topakları içine
              altın hapsedebilir ve fark edilmeden atılabilir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Numunenin hacminin pan başına makul bir miktarda tutulması —
              aşırı dolu bir pan hem karıştırmayı zorlaştırır hem kontrolü
              azaltır.
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Panlama Adımları
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Pan tamamen su altındayken malzemeyi ekle ve elinle karıştırarak
              kil topaklarını dağıt, büyük taşları elle ayıkla.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Pan hâlâ su altındayken hafifçe yatay, dairesel hareketlerle
              salla — bu hareket ağır parçacıkların dibe inmesini sağlar.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Panı hafifçe öne eğerek, üstteki hafif malzemeyi ve suyu
              kenardan nazikçe dökmeye başla; sert veya ani hareketlerden
              kaçın.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Malzeme azaldıkça hareketleri küçült ve daha temkinli çalış —
              son aşamalarda hafif bir yanlış hareket ince altını kolayca
              kaçırabilir.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Dipte sadece koyu siyah kum ve varsa altın kalana kadar
              &quot;salla-eğ-dök&quot; döngüsünü tekrarla; bu noktada işlemi
              durdur ve sonucu değerlendir.
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
              Çok hızlı ve agresif çalkalayarak ince, pul şeklindeki altını
              hafif malzemeyle birlikte kaybetmek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Panı su yüzeyinin üstünde tutup malzemeyi kontrolsüzce dökmek —
              panlama daima su altında/su yüzeyine yakın yapılmalıdır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kil topaklarını yeterince dağıtmadan işleme devam etmek ve
              içindeki altını fark etmeden atmak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Son aşamada acele edip &quot;neredeyse bitti&quot; hissiyle son
              birkaç hareketi çok sert yapmak — asıl kayıpların çoğu bu
              aşamada yaşanır.
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
                href="/rehber/siyah-kum"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Siyah Kum Altına Nasıl İşaret Eder? →
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
            <li>
              <Link
                href="/rehber/derede-altin-nasil-bulunur"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Derede Altın Nasıl Bulunur? (Tam Rehber) →
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
