import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Kuvars Damarlarında Altın Nasıl Aranır?";
const PAGE_DESCRIPTION =
  "Hangi kuvarsın umut vaat ettiğini, hangisinin sıradan olduğunu ve bulduğun bir örneği sahada nasıl hızlıca değerlendireceğini anlatan saha rehberi.";
const PAGE_URL = "https://kirintimadencilik.com/rehber/kuvars-damarlari";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/kuvars-damarlari",
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

export default function KuvarsDamarlariPage() {
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
          Kuvars Damarlarında Altın Nasıl Aranır?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Bir dağ yamacında ya da dere yatağında karşılaşılan süt beyazı
          kuvars parçaları, altın arayıcıları için genellikle ilk durak
          noktasıdır. Kuvarsın kendisi altın değildir, ama oluşumu sırasında
          aynı sıcak sulu çözeltilerin altını da taşımış olabileceğinin en
          görünür kanıtıdır. Bu sayfa, hangi kuvarsın umut vaat ettiğini,
          hangisinin sadece sıradan bir kayaç parçası olduğunu ve bulduğun bir
          örneği sahada nasıl hızlıca değerlendirebileceğini anlatıyor.
        </p>

        {/* Hero görsel — hedef dosya: public/images/rehber/kuvars-damarlari-hero.png (henüz eklenmedi) */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/kuvars-damarlari-hero.png"
            alt="Ana kayaç içinde pas lekeli, gözenekli bir kuvars damarını gösteren şematik görsel"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Kuvars Damarı Nedir, Neden Önemlidir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Yerkabuğundaki çatlaklardan yükselen sıcak, silika bakımından
            zengin hidrotermal sular, soğudukça bu çatlakları kuvars
            kristalleriyle doldurur. Bu sular çoğu zaman aynı derinliklerden
            altın, gümüş ve çeşitli sülfür minerallerini (pirit, kalkopirit
            gibi) de çözünmüş halde taşır; sıcaklık ve basınç düştükçe bu
            metaller kuvarsla birlikte veya kuvarsın hemen yanında çökelebilir.
            Bu yüzden bir bölgedeki yoğun kuvars damarlaşması, geçmişte aktif
            bir hidrotermal sistemin varlığının ve dolayısıyla altın
            potansiyelinin dolaylı ama güçlü bir göstergesidir.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Ancak her kuvars damarı aynı hikâyeyi anlatmaz — sığ ve düşük
            sıcaklıkta oluşmuş bazı damarlar tamamen kısırdır. Asıl iş,
            damarın kendi görünümündeki ipuçlarını doğru okuyabilmektir.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Süt beyazı yerine gri, sarımsı veya pas lekeli kuvars — temiz
              beyaz kuvars genelde daha az umut vaat eder.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Gözenekli, &quot;petek&quot; gibi boşluklu doku — çözünüp gitmiş
              sülfür kristallerinin geride bıraktığı boşluklar olabilir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Kuvars içinde veya üzerinde küp şeklinde boşluklar ya da
              kalıntılar — çözünmüş pirit kristallerinin izi.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Damarın ana kayaçla birleştiği kontakt hattı — mineralizasyon
              çoğu zaman bu hatta yoğunlaşır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Dere yatağında dağınık kuvars parçaları — membaya doğru
              çıkıldıkça yoğunluğun arttığı yön, kaynağa işaret eder.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altınla İlişkisi Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Görünür/serbest altın kuvars damarlarında nadiren gözle fark
            edilir; bulunduğunda bile genelde damarın kenarında, sülfür
            kalıntılarının olduğu gözenekli bölgelerde ince tel veya benek
            şeklindedir. Altının büyük kısmı gözle görülemeyecek kadar küçük
            tanecikler halinde kuvars-sülfür birlikteliği içine dağılmıştır ve
            ancak kırma, öğütme ve panlama sonrasında ortaya çıkar. Bu yüzden
            &quot;içinde altın görünmüyor&quot; demek, o kuvarsın altın
            taşımadığı anlamına gelmez — asıl test, örneği kırıp yıkamaktır.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Kuvars Örneği Sahada Nasıl Değerlendirilir?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Yüzeydeki kuvars parçalarını takip ederek membaya doğru yürü;
              parça yoğunluğunun arttığı yön damarın kaynağına götürür.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Pas lekeli, gözenekli ve sülfür kalıntılı görünen parçaları ayrı
              bir kesede topla, temiz beyaz parçalarla zaman kaybetme.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Seçtiğin örnekleri bir çekiçle kırıp taze kırık yüzeyi incele —
              sülfür izleri taze yüzeyde çok daha net görülür.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Kırdığın parçaları iyice ufalayıp bir panda yıka; dipte kalan
              siyah kum ve varsa altın miktarını değerlendir.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Farklı noktalardan aldığın örnekleri karşılaştırarak damarın
              hangi kesiminin daha zengin olduğunu belirle ve işaretle.
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
              Her beyaz kuvarsı umut verici sanıp pas lekesi/gözeneklilik gibi
              asıl önemli ipuçlarını gözden kaçırmak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Sadece dere yatağındaki dağınık parçalara bakıp damarın gerçek
              kaynağını hiç aramamak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Örneği kırmadan, sadece yüzeyine bakarak &quot;altın yok&quot;
              diye karar vermek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Farklı noktalardan alınan örnekleri karıştırıp hangi parçanın
              nereden geldiğini kaybetmek.
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
                href="/rehber/panlama-adimlari"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Doğru Panlama Adım Adım Nasıl Yapılır? →
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
