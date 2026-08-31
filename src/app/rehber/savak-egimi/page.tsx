import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Savak Eğimi ve Su Debisi Nasıl Ayarlanır?";
const PAGE_DESCRIPTION =
  "Savak (sluice box) kurulumunda doğru eğim ve su debisinin neden kritik olduğunu, sahada nasıl test edileceğini ve sık yapılan hataları anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/savak-egimi";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/savak-egimi",
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

export default function SavakEgimiPage() {
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
          Savak Eğimi ve Su Debisi Nasıl Ayarlanır?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Savak (sluice box), panlamadan çok daha fazla malzemeyi kısa
          sürede işleyebilen bir araçtır — ama bu verim, doğru kurulduğu
          takdirde geçerlidir. Yanlış eğim ya da yanlış su debisi, panın
          dibinde kolayca yakalanacak ince altını bile gözünüzün önünde
          kaçırabilir. Bu sayfa, savağın neden bu kadar hassas bir dengeye
          ihtiyaç duyduğunu, sahada doğru eğim ve debinin nasıl test
          edileceğini anlatıyor.
        </p>

        {/* Hero görsel — public/images/rehber/savak-egimi-hero.png */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/savak-egimi-hero.png"
            alt="Dere içine kurulmuş, su akışıyla çalışan bir savağın (sluice box) kapanlarında biriken koyu renkli malzemeyi gösteren fotoğraf"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Savak Eğimi Neden Bu Kadar Kritiktir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir savak, içindeki kapanların (riffle) arkasında oluşan küçük
            girdaplar sayesinde çalışır: bu girdaplar hafif malzemeyi
            yüzeyde tutup akışla birlikte ileri taşırken, ağır parçacıkları
            (altın ve siyah kum) dibe çökertip kapanın arkasında hapseder.
            Bu etkinin oluşabilmesi için akan suyun ne çok yavaş ne de çok
            hızlı olması gerekir — genellikle 10-15 derece arası bir eğim
            iyi bir başlangıç noktasıdır, ama asıl doğru değer sahada su
            debisine göre ince ayarla bulunur.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Kurulumdan Önce Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Savağın su girişinin, doğal akıntıdan yeterli ve düzenli su
              alabileceği bir noktaya yerleştirilmesi.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Savağın zemine sabitlenmiş, su akışı sırasında sallanmayan
              sağlam bir konumda durması.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kapanların (riffle) tümünün temiz ve tıkanmamış olması —
              önceki kullanımdan kalan malzeme akışı bozabilir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Beslediğin malzemenin büyük taşlardan arındırılmış olması —
              iri parçalar savağın içinde akışı bozup malzemeyi sıçratabilir.
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Doğru Eğim ve Debi Sahada Nasıl Test Edilir?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Savağı orta bir eğimle (yaklaşık 10-15 derece) kur ve suyu
              akıtmaya başla.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Kapanların arkasında hafif bir girdap oluşup oluşmadığını
              gözle — girdap yoksa eğimi biraz azalt ya da debiyi artır.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Az miktarda bilinen ağırlıkta siyah kum veya küçük bir test
              numunesi besleyip savağın sonunda kaybolup kaybolmadığını
              kontrol et.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Malzeme kapanların üzerinden atlayıp gidiyorsa eğimi azalt;
              malzeme birikip tıkanıyorsa eğimi veya debiyi artır.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              İdeal dengeyi bulduğunda eğim açısını not et — aynı savağı
              aynı akış koşullarında tekrar kurarken referans olarak kullan.
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
              Savağı çok dik kurup ince ve pul altının kapanların üzerinden
              atlayıp kaybolmasına neden olmak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Debiyi çok düşük tutup malzemenin savağın başında birikip
              tıkanmasına izin vermek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Savağı bir kere kurup gün boyunca eğimi hiç kontrol etmeden
              çalıştırmak — akış zamanla değişebilir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Aşırı miktarda malzemeyi hızlıca beslemek — kapanlar dolduğunda
              yakalama etkisi büyük ölçüde azalır.
            </li>
          </ul>
        </section>

        <div className="mt-10 rounded-xl border-l-2 border-accent bg-surface-2 px-5 py-4">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            Mevzuat ve İzin Notu
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Sahada savak kurulumu ve numune toplama, bölgeye, arazi
            statüsüne ve kullanılan yönteme göre değişen izin/ruhsat
            gereklilikleri içerebilir. Bu sayfa hukuki tavsiye niteliği
            taşımaz — sahaya çıkmadan önce bulunduğun bölgedeki güncel
            mevzuatı ve gerekli izinleri ilgili resmi kurumlardan
            doğrulaman önerilir.
          </p>
        </div>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            İlgili Rehberler
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/rehber/panlama-adimlari"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Doğru Panlama Adım Adım Nasıl Yapılır? →
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/dogal-tuzak"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Doğal Tuzak (Pothole) İçinde Altın Nasıl Birikir? →
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
