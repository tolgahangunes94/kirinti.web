import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const PAGE_TITLE = "Taban Kayası Çatlaklarında Altın Nasıl Sıkışır?";
const PAGE_DESCRIPTION =
  "Taban kayasına neden ulaşmak gerektiğini, hangi çatlak tiplerinin daha verimli olduğunu ve bu çatlakların nasıl doğru temizleneceğini anlatan saha rehberi.";
const PAGE_URL =
  "https://kirintimadencilik.com/rehber/taban-kayasi-catlaklari";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/rehber/taban-kayasi-catlaklari",
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

export default function TabanKayasiCatlaklariPage() {
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
          Taban Kayası Çatlaklarında Altın Nasıl Sıkışır?
        </h1>

        <p className="mt-4 text-base leading-relaxed text-muted">
          Altın, çevresindeki malzemeden çok daha yoğun olduğu için bir
          akarsu yatağında sonsuza kadar yüzeyde kalmaz — zamanla gevşek
          tortu tabakalarını aşağı doğru keser ve en sonunda sert taban
          kayasına ulaşır. İşte tam bu noktada, taban kayasındaki her çatlak,
          oluk ve pürüz doğal bir kapan görevi görmeye başlar. Bu sayfa,
          taban kayasına neden ulaşmak gerektiğini, hangi çatlak tiplerinin
          daha verimli olduğunu ve bu çatlakları doğru şekilde nasıl
          temizleyeceğini anlatıyor.
        </p>

        {/* Hero görsel — hedef dosya: public/images/rehber/taban-kayasi-catlaklari-hero.png (henüz eklenmedi) */}
        <div className="relative mt-8 aspect-video w-full overflow-hidden">
          <Image
            src="/images/rehber/taban-kayasi-catlaklari-hero.png"
            alt="Bir akarsu yatağındaki taban kayası çatlağında biriken ağır mineral ve altın tanelerini gösteren şematik görsel"
            fill
            className="object-contain"
            sizes="(min-width: 672px) 672px, 100vw"
            priority
          />
        </div>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Taban Kayası Neden Bu Kadar Önemlidir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Bir dere yatağını yukarıdan aşağıya kestiğinde genelde üç katman
            görürsün: en üstte gevşek, sık sık hareket eden yüzey malzemesi;
            onun altında daha yerleşmiş, daha eski çakıl-kum katmanları; en
            altta ise suyun daha fazla derine inemediği sert taban kayası.
            Altın, özgül ağırlığı sayesinde yıllar içinde bu katmanların en
            altına, taban kayasının hemen üzerine ve varsa çatlaklarının
            içine çöker. Üstteki gevşek malzemede bulunan altın genelde geçici
            ve az miktardadır; asıl birikim çoğunlukla taban kayasıyla temas
            eden ince bir bantta yoğunlaşır.
          </p>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Sahada Neye Bakılır?
          </h2>
          <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-foreground">
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Akış yönüne göre yukarı-akış tarafında kalan, girdap oluşturan
              çatlak ve oluklar — malzemeyi içine çeken ve tutan noktalardır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çatlağın derinliği ve genişliği — dar ama derin çatlaklar, sığ
              ve geniş olanlara göre malzemeyi daha iyi tutar.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Taban kayası üzerindeki doğal pürüzler, kenar çıkıntıları ve
              küçük basamaklar — akıntıyı yavaşlatan her engel potansiyel bir
              kapandır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Taban kayasının kendisinin pürüzlü mü yoksa düz-cilalı mı
              olduğu — düz ve cilalı yüzeyler malzemeyi tutmadan akıtır.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Çatlağın içindeki dolgu malzemesinin rengi ve yoğunluğu —
              koyu, siyah kum ağırlıklı dolgu iyi bir işarettir.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mt-10 text-balance text-xl font-semibold tracking-tight text-foreground">
            Altınla İlişkisi Nedir?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Taban kayası çatlakları, akarsuyun binlerce yıl boyunca elediği
            malzemenin doğal olarak biriktiği son duraktır. Bir çatlağın
            içindeki malzeme genellikle üzerindeki gevşek tabakalardan çok
            daha eski ve çok daha &quot;işlenmiş&quot;tir — yani hafif
            parçacıklar çoktan akıp gitmiş, geriye ağır mineraller ve varsa
            altın kalmıştır. Bu yüzden tek bir zengin çatlak, üzerindeki
            metrelerce gevşek malzemeden çok daha fazla altın barındırabilir;
            deneyimli arayıcılar genellikle üstteki katmanları hızla geçip
            asıl zamanlarını taban kayasını temizlemeye ayırır.
          </p>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6">
          <h2 className="text-balance text-xl font-semibold tracking-tight text-foreground">
            Çatlaklar Nasıl Temizlenir?
          </h2>
          <ol className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-foreground">
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                1
              </span>
              Çatlağın üzerindeki gevşek malzemeyi bir kürek veya el aletiyle
              kabaca temizleyerek taban kayasını görünür hale getir.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                2
              </span>
              Sert fırça veya küçük bir kazıyıcı ile çatlağın içindeki
              sıkışmış malzemeyi dışarı çıkar; mümkünse çatlağın en dibine
              kadar in.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                3
              </span>
              Çıkardığın malzemeyi ayrı bir kapta topla — üstteki gevşek
              malzemeyle karıştırma, sonuçları yanıltır.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                4
              </span>
              Bu malzemeyi ayrıca panla ve dipte kalan siyah kum/altın
              miktarını üstteki katmanla karşılaştır.
            </li>
            <li className="flex gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[11px] font-semibold text-accent">
                5
              </span>
              Zengin çıkan çatlakların konumunu ve yönünü not et; aynı akış
              hattındaki benzer çatlaklar genelde benzer sonuç verir.
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
              Sadece görünen yüzeyi temizleyip çatlağın derinliklerindeki
              sıkışmış malzemeyi hiç çıkarmamak.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Taban kayası malzemesini üstteki gevşek malzemeyle karıştırıp
              hangi katmanın ne kadar altın verdiğini ayırt edememek.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Düz ve cilalı taban kayası bölgelerinde ısrarla vakit
              harcamak; asıl potansiyel pürüzlü/çatlaklı kesimlerdedir.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
              Akış yönünü dikkate almadan rastgele nokta seçmek — çatlağın
              yukarı-akış tarafı genelde aşağı-akış tarafından çok daha
              zengindir.
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
                href="/rehber/dere-kivrimlarinda-altin"
                className="font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Dere Kıvrımlarında Altın Nasıl Birikir? →
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

        <div className="mt-10 border-t border-border pt-6">
          <BackToGuideLink />
        </div>
      </main>
    </>
  );
}
