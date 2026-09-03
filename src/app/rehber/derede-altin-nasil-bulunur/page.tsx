import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE =
  "Derede Altın Nasıl Bulunur? Başlangıçtan Saha Okumaya Tam Rehber";
const PAGE_DESCRIPTION =
  "Kırıntı (plaser) altının ne olduğundan dere okumaya, iç virajlardan taban kayası çatlaklarına, doğru numune almadan panlama ve savak kullanımına kadar derede altın aramanın tüm temellerini tek sayfada anlatan kapsamlı saha rehberi.";
const PAGE_URL =
  "https://kirintimadencilik.com/rehber/derede-altin-nasil-bulunur";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/derede-altin-nasil-bulunur",
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

export default function DeredeAltinNasilBulunurPage() {
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
          Kapsamlı Rehber
        </span>

        <h1 className="text-balance mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Derede Altın Nasıl Bulunur? Başlangıçtan Saha Okumaya Tam Rehber
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Derede altın aramak, şansa değil doğru okumaya dayanan bir
          faaliyettir — su nereye yavaşlıyor, ağır mineraller nerede
          takılıyor, hangi kayaç rengi hangi hikâyeyi anlatıyor. Bu sayfa,
          kırıntı (plaser) altının ne olduğundan başlayıp dere okumaya,
          altının biriktiği doğal noktalara, doğru numune alma ve
          değerlendirme tekniklerine kadar tüm temelleri tek yerde toplayan
          bir başlangıç rehberidir. Her bölümün altında, konuyu derinlemesine
          işleyen ayrı bir saha rehberine link bulacaksın.
        </p>

        {/* Hero görsel — public/images/rehber/derede-altin-nasil-bulunur-hero.png */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/derede-altin-nasil-bulunur-hero.png"
            alt="Dere yatağında altın arama sahasını gösteren genel bir manzara fotoğrafı"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Kırıntı (Plaser) Altın Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Kırıntı madenciliği (plaser madenciliği), ana kayaçtan milyonlarca
            yıl önce ayrışıp akarsularla taşınmış, dere yatağında serbest
            haldeki altın tanelerini arama faaliyetidir. Bu altın, bir
            damardan doğrudan çıkarılmaz; dağdaki bir kaynak kayaçtan
            aşınarak koptuğu andan itibaren akarsuyun taşıdığı çakıl, kum ve
            silt ile birlikte aşağı doğru yolculuk eder. Altın diğer
            malzemelerden yaklaşık 19 kat daha yoğun olduğu için bu yolculuk
            boyunca aynı fiziksel kurallara göre hareket eder: hafif malzeme
            uzağa taşınırken altın, suyun enerjisinin düştüğü noktalarda
            geride kalır.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bu yüzden derede altın aramak aslında bir kazı işi değil, bir
            &quot;okuma&quot; işidir — doğru soruyu sormak: su burada
            yavaşladı mı, yoksa hızlandı mı?
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Dere Neden Okunmalı?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir akarsu boyunca su hızı sabit değildir; virajlar, eğim
            değişimleri, büyük taşlar ve taban kayası pürüzleri suyun
            enerjisini sürekli değiştirir. Altın, tıpkı bir doğal ayıklama
            makinesi gibi, bu enerjinin düştüğü her noktada birikme
            eğilimindedir. Deneyimli bir arayıcı, kilometrelerce dere yatağını
            rastgele kazmak yerine, akış davranışını okuyarak yalnızca
            enerjinin düştüğü &quot;yüksek olasılıklı&quot; noktalara
            odaklanır. Bu okuma becerisi, kırıntı madenciliğinde harcanan
            emeği doğrudan verime çeviren en temel yetenektir.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altın Derede Nerelerde Birikir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Akarsu enerjisinin düştüğü noktalar sahada birkaç tekrarlayan
            yapı olarak karşımıza çıkar. Aşağıdaki beş yapı, bir dere
            yatağında altın aramaya başlarken öncelik sırasına koyman gereken
            temel numune noktalarıdır.
          </p>

          <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
            İç Virajlar
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Bir derenin döndüğü her virajda dış tarafta su hızlanıp erozyon
            yaparken, iç tarafta su yavaşlar ve enerjisini kaybeder — bu düşük
            enerjili bölge, ağır partiküllerin çökelmesi için ideal bir
            ortamdır.{" "}
            <Link
              href="/rehber/dere-kivrimlarinda-altin"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              İç virajlarda altının nasıl biriktiğini detaylı rehberde
              incele →
            </Link>
          </p>

          <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
            Taban Kayası ve Çatlaklar
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Altın, özgül ağırlığı sayesinde zamanla gevşek tortu
            tabakalarını aşağı doğru keser ve sert taban kayasına ulaşır;
            oradaki her çatlak ve oluk doğal bir kapan görevi görür.{" "}
            <Link
              href="/rehber/taban-kayasi-catlaklari"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Taban kayası çatlaklarını sahada nasıl temizleyeceğini öğren →
            </Link>
          </p>

          <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
            Doğal Tuzaklar
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Taban kayasındaki sert bir çıkıntı etrafında yıllarca dönen bir
            girdap, zamanla dairesel bir çukur oyar; bu &quot;doğal
            tuzaklar&quot; hem malzemeyi içeride tutar hem de yıllar boyunca
            biriken ağır mineralleri hapseder.{" "}
            <Link
              href="/rehber/dogal-tuzak"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Doğal tuzakların nasıl bulunup temizleneceğini gör →
            </Link>
          </p>

          <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
            Siyah Kum ve Ağır Mineraller
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Manyetit ve ilmenit gibi ağır demir mineralleri, tıpkı altın gibi
            yüksek özgül ağırlığa sahiptir ve akarsu tarafından benzer
            noktalarda biriktirilir — panının dibinde kalan koyu kum
            miktarı, doğru yerde olduğunun ilk işaretidir.{" "}
            <Link
              href="/rehber/siyah-kum"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Siyah kumu nasıl okuyacağını öğren →
            </Link>
          </p>

          <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
            Kuvars, Hematit ve Limonit Göstergeleri
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Süt beyazı yerine pas lekeli, gözenekli kuvars parçaları ve
            kırmızımsı-kahverengi hematit/limonit alterasyon bölgeleri,
            geçmişte aktif bir hidrotermal sistemin ve dolayısıyla altın
            mineralizasyonunun dolaylı göstergeleridir.{" "}
            <Link
              href="/rehber/kuvars-damarlari"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Kuvars damarlarını değerlendirmeyi öğren
            </Link>{" "}
            ve{" "}
            <Link
              href="/rehber/hematit-limonit"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              hematit/limonit alterasyonunu sahada nasıl takip edeceğini gör
              →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Numune Nasıl Alınır?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Yukarıdaki noktalardan birini bulduğunda amaç, o noktanın
            gerçekten umut vaat edip etmediğini en az emekle anlamaktır.
            Küçük ama temsili bir numune al — taban kayasına veya çatlağın
            dibine kadar inen, çevredeki gevşek malzemeyle karıştırılmamış
            bir örnek, üstteki birkaç metrelik düz yataktan alınan büyük bir
            numuneden çok daha anlamlıdır. Farklı noktalardan alınan
            numuneleri birbirine karıştırmadan, konum notlarıyla birlikte
            ayrı ayrı değerlendirmek, hangi bölgenin gerçekten zengin
            olduğunu anlamanın tek güvenilir yoludur.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Panlama: Sahadaki İlk Doğrulama
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Panlama, aldığın numuneyi sahada saniyeler içinde
            değerlendirmenin en ucuz ve en hızlı yoludur. Yerçekimi ve su
            yardımıyla ağır mineralleri hafif malzemeden ayırır; dipte kalan
            siyah kum ve varsa altın, o noktanın devam etmeye değip
            değmediğini gösterir. Ancak teknik doğru uygulanmazsa, panın
            dibinde gerçekten bulunan ince altın bile suyla birlikte kayıp
            gidebilir.{" "}
            <Link
              href="/rehber/panlama-adimlari"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Panlamayı adım adım doğru yapmayı öğren →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Savak Kullanımı: Daha Fazla Malzemeyi İşlemek
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir nokta panlamayla umut verici çıktıysa ve daha büyük hacimli
            malzemeyi işlemek istiyorsan sıradaki araç savaktır (sluice
            box). Savak, akan suyun gücünü kullanarak panlamadan çok daha
            fazla malzemeyi kısa sürede eleyebilir — ama bu verim, doğru
            eğim ve su debisi dengesine bağlıdır; yanlış kurulum ince altını
            gözünün önünde kaçırabilir.{" "}
            <Link
              href="/rehber/savak-egimi"
              className="font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Doğru savak eğimini ve debiyi nasıl ayarlayacağını öğren →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Sık Yapılan Hatalar
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Dere okumadan, rastgele noktalarda kazıp zaman ve emek
              harcamak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Sadece üstteki gevşek malzemeyi numunelemek, taban kayasına
              veya çatlaklara hiç inmemek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Siyah kum çıkmayan bir noktada ısrarla uzun süre çalışmaya
              devam etmek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Panlama veya savak tekniğini agresif uygulayıp ince, pul
              şeklindeki altını hafif malzemeyle birlikte kaybetmek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Farklı noktalardan alınan numuneleri konum notu almadan
              karıştırıp hangi bölgenin daha zengin olduğunu unutmak.
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

        <div className="mt-10 border-t border-border pt-6">
          <BackToGuideLink />
        </div>
      </main>
    </>
  );
}
