import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import CommunityCta from "@/components/CommunityCta";

const PAGE_TITLE = "Derede Altın Aramak Nedir? Başlangıç Rehberi";
const PAGE_DESCRIPTION =
  "Derede altın aramak nedir, gerçekten altın bulunur mu? Kırıntı (plaser) altının ne olduğunu, altının derede nerede biriktiğini, başlangıç için gereken temel ekipmanı ve mevzuat konusunda dikkat edilmesi gerekenleri anlatan başlangıç rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/derede-altin-aramak";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/derede-altin-aramak",
  },
};

const ARTICLE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
};

export default function DeredeAltinAramakPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_JSON_LD) }}
      />
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
          Başlangıç Rehberi
        </span>

        <h1 className="text-balance mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Derede Altın Aramak Nedir ve Nasıl Başlanır?
        </h1>

        {/* Hero görsel — public/images/rehber/derede-altin-aramak-hero.png */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/derede-altin-aramak-hero.png"
            alt="Taşlık bir dere kenarında elinde pan tavasıyla altın arayan bir kişi"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Derede altın aramak, akarsuların binlerce yıl boyunca dağdan
          taşıdığı ağır mineralleri dere yatağında doğru noktalarda arayıp
          ayrıştırma faaliyetidir. Bu sayfa, konuya yeni başlayan biri için en
          çok sorulan soruları — ne olduğunu, gerçekten sonuç verip
          vermediğini, hangi ekipmanla başlanacağını ve nelere dikkat
          edilmesi gerektiğini — kısa ve net şekilde yanıtlıyor.
        </p>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Derede Altın Aramak Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Derede altın aramak, dağlardaki kaynak kayaçtan aşınıp kopan
            altın tanelerinin, akarsuyun taşıma gücüyle aşağı doğru
            sürüklenip suyun yavaşladığı noktalarda birikmesi ilkesine
            dayanır. Bu birikimleri bulmak için kazma değil, dere okuma
            becerisi gerekir: suyun nerede yavaşladığını, hangi kayaç
            yapılarının doğal bir tuzak oluşturduğunu ve hangi işaretlerin
            yakında altın olabileceğini anlamak.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir kürek, bir pan ve biraz sabırla başlanabilecek bu faaliyet,
            zamanla dere yapısını okuma deneyimiyle birlikte gelişen bir
            beceri hâline gelir.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Gerçekten Derede Altın Bulunur mu?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Evet — ama beklentiyi doğru kurmak önemli. Türkiye&apos;de kuvars
            damarları, jeotermal hatlar ve alüvyon yatakları gibi
            belgelenmiş birçok jeolojik bölge, altın mineralizasyonuna
            işaret ediyor. Büyük külçeler nadirdir; asıl hedef genellikle
            ince taneli (&quot;flake&quot;) altın ve zamanla biriken küçük
            miktarlardır. Doğru bölgeyi seçmek, rastgele bir dereye
            gitmekten çok daha belirleyicidir.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Türkiye&apos;deki kaynaklı jeolojik bölgeleri (kuvars damarı,
            jeotermal hat, maden sahası, plaser) görsel bir harita üzerinde
            incelemek için{" "}
            <Link
              href="/harita"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Harita &amp; Bölgeler
            </Link>{" "}
            sayfasına göz atabilirsin.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Kırıntı (Plaser) Altın Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Derede aranan altın, teknik olarak &quot;kırıntı&quot; veya
            &quot;plaser&quot; altın olarak adlandırılır — bir damardan
            doğrudan çıkarılmış değil, ana kayaçtan ayrışıp akarsuyla
            taşınmış serbest haldeki altındır. Altın diğer malzemelerden
            çok daha yoğun olduğu için bu yolculuk boyunca aynı fiziksel
            kurallara uyar: hafif malzeme uzağa taşınırken altın, enerjinin
            düştüğü noktalarda geride kalır.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altın Derede Hangi Tür Alanlarda Birikir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Altının derede biriktiği noktalar rastgele değildir; suyun
            enerjisinin düştüğü belirli yapı türlerinde tekrar eder. En sık
            karşılaşılan üç tür:
          </p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <Link
                  href="/rehber/taban-kayasi-catlaklari"
                  className="font-medium text-accent transition-colors hover:text-accent-strong"
                >
                  Taban kayası çatlakları
                </Link>{" "}
                — ağır altın taneleri, akışın hemen altındaki sert kayaç
                yüzeyindeki yarık ve oyuklara sıkışıp kalır.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <Link
                  href="/rehber/dogal-tuzak"
                  className="font-medium text-accent transition-colors hover:text-accent-strong"
                >
                  Doğal tuzaklar (pothole yapıları)
                </Link>{" "}
                — girdaplı çukurlar, taşıdığı malzemeyi kendi içinde
                döndürerek ağır mineralleri doğal olarak süzer.
              </span>
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>
                <Link
                  href="/rehber/siyah-kum"
                  className="font-medium text-accent transition-colors hover:text-accent-strong"
                >
                  Siyah kum ve ağır mineral birikintileri
                </Link>{" "}
                — koyu renkli, yoğun kum tabakaları genellikle altınla aynı
                fiziksel koşullarda biriktiği için güvenilir bir işarettir.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Başlangıç İçin Temel Ekipman
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Derede altın aramaya başlamak için karmaşık bir ekipmana ihtiyaç
            yoktur; birçok arayıcı sadece birkaç temel parçayla başlar:
          </p>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Pan (altın tavası) — numuneyi yıkayıp ağır mineralleri geride
              bırakmak için temel araç.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Küçük el küreği ve maşa — çatlaklardan ve dar boşluklardan
              numune almak için.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Elek — büyük çakılları ayıklayıp panlanacak malzemeyi
              inceltmek için.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Savak (sluice box) — daha fazla numuneyi daha kısa sürede
              değerlendirmek isteyenler için.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Numuneyi doğru şekilde değerlendirmek en az doğru ekipman kadar
            önemlidir —{" "}
            <Link
              href="/rehber/panlama-adimlari"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              doğru panlama adımlarını
            </Link>{" "}
            öğrenmek, elindeki altını gözden kaçırmamanı sağlar.
          </p>
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

        <Link
          href="/rehber/derede-altin-nasil-bulunur"
          className="motion-safe:transition-colors mt-10 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-6 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
              Kapsamlı Rehber
            </span>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
              Derede Altın Nasıl Bulunur?
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Dere okumadan numune alma ve değerlendirmeye kadar tüm
              temelleri tek sayfada toplayan tam rehber.
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
            Rehberi Aç
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
              <path d="M7 4l6 6-6 6" />
            </svg>
          </span>
        </Link>

        <div className="mt-10">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            İlgili Rehberler
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link
                href="/rehber"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Tüm Saha Rehberlerini Gör →
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
                href="/rehber/siyah-kum"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Siyah Kum Altına Nasıl İşaret Eder? →
              </Link>
            </li>
            <li>
              <Link
                href="/rehber/panlama-adimlari"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Doğru Panlama Adım Adım Nasıl Yapılır? →
              </Link>
            </li>
          </ul>
        </div>
      </main>

      <CommunityCta />
    </>
  );
}
