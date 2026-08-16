"use client";

import { useState } from "react";

type Category = "all" | "geology" | "stream" | "technique";

const CATEGORY_TABS: { label: string; value: Category }[] = [
  { label: "Tümü", value: "all" },
  { label: "Jeoloji & Kayaçlar", value: "geology" },
  { label: "Dere Mantığı & Kapanlar", value: "stream" },
  { label: "Saha Teknikleri", value: "technique" },
];

const CATEGORY_LABELS: Record<Exclude<Category, "all">, string> = {
  geology: "Jeoloji & Kayaçlar",
  stream: "Dere Mantığı & Kapanlar",
  technique: "Saha Teknikleri",
};

type GuideItem = {
  id: string;
  category: Exclude<Category, "all">;
  title: string;
  summary: string;
  detail: string;
  icon: React.ReactNode;
};

const GUIDE_ITEMS: GuideItem[] = [
  {
    id: "kuvars-damarlari",
    category: "geology",
    title: "Kuvars Damarları",
    summary:
      "Süt beyazı kuvars damarları, altın oluşumunun en klasik göstergelerinden biridir.",
    detail:
      "Ana kayaç içinde beyaz veya gri renkli kuvars damarları, hidrotermal çözeltilerin geçmişte bu bölgeden aktığının işaretidir. Özellikle pas rengi (demir oksit) lekeler taşıyan, gözenekli ve kırılgan kuvars parçaları serbest altın barındırma ihtimali yüksek örneklerdir. Dere yatağında bu tür kuvars parçalarına rastlamak, membaya doğru bir damar kaynağının varlığına işaret edebilir.",
    icon: <path d="M10 2 4 8l6 10 6-10-6-6Z" />,
  },
  {
    id: "hematit-limonit",
    category: "geology",
    title: "Hematit / Limonit Alterasyon Bölgeleri",
    summary:
      "Kırmızımsı-kahverengi 'pas' renkli kayaçlar, mineralize bölgelerin habercisidir.",
    detail:
      "Hematit (kırmızı) ve limonit (sarı-kahve) alterasyonu, orijinal sülfür minerallerinin (özellikle pirit) yüzeyde oksitlenmesiyle oluşur. 'Gossan' adı verilen bu pas renkli bölgeler, altında sülfür damarları ve dolayısıyla altın mineralizasyonu barındırabilir. Saha gözleminde bu renk değişimlerini takip etmek, potansiyel kaynak bölgelerini daraltmada etkili bir yöntemdir.",
    icon: <path d="M3 6h14M3 10h14M3 14h14" />,
  },
  {
    id: "siyah-kum",
    category: "geology",
    title: "Siyah Kum (Manyetit / İlmenit) Analizi",
    summary:
      "Konsantrattaki siyah kum yoğunluğu, doğru noktada olduğunuzun ilk işaretidir.",
    detail:
      "Manyetit ve ilmenit gibi ağır demir mineralleri, tıpkı altın gibi yüksek özgül ağırlığa sahiptir ve akarsu tarafından benzer noktalarda biriktirilir. Panınızın sonunda kalan koyu, mıknatısa yapışan kum miktarı arttıkça aynı bölgede altın bulma olasılığı da artar — siyah kum, doğanın kendi doğal ayıklama işlemidir.",
    icon: (
      <>
        <circle cx="6" cy="7" r="1.3" />
        <circle cx="11" cy="6" r="1" />
        <circle cx="14" cy="9" r="1.3" />
        <circle cx="7" cy="12" r="1" />
        <circle cx="12" cy="13" r="1.3" />
        <circle cx="15" cy="14" r="1" />
      </>
    ),
  },
  {
    id: "inside-bend",
    category: "stream",
    title: "Inside Bend (İç Viraj) Birikimleri",
    summary:
      "Akıntının yavaşladığı iç virajlar, ağır minerallerin doğal tuzaklarıdır.",
    detail:
      "Bir derenin döndüğü her virajda dış tarafta su hızlanıp erozyon yaparken, iç tarafta su yavaşlar ve enerjisini kaybeder. Bu düşük enerjili bölge, taşınan ağır partiküllerin (altın dahil) çökelmesi için ideal bir ortam oluşturur. Özellikle virajın çıkışına yakın, çakıl birikintisinin kalınlaştığı noktalar öncelikli örnekleme alanlarıdır.",
    icon: <path d="M3 4c0 4 8 2 8 7s6 3 6 5" />,
  },
  {
    id: "taban-kayasi",
    category: "stream",
    title: "Taban Kayası (Bedrock) Çatlakları",
    summary:
      "Altın, ulaşabildiği en derindeki çatlağa kadar iner ve orada kalır.",
    detail:
      "Altın çevresindeki malzemeden çok daha yoğun olduğu için, akarsu yatağındaki gevşek tortu tabakalarını zamanla aşağı doğru keser ve taban kayasına ulaşır. Taban kayasındaki her çatlak, oluk ve pürüz, akıntıya karşı doğal bir kapan görevi görür. Kazı yaparken taban kayasına ulaşmak ve bu çatlakları özenle temizlemek, verimi en çok artıran adımdır.",
    icon: <path d="M3 16 7 9l2 3 2-5 3 4 3-3" />,
  },
  {
    id: "pothole",
    category: "stream",
    title: "Pothole Yapısı",
    summary: "Girdaplı çukurlar, yıllar içinde birikmiş doğal altın kasalarıdır.",
    detail:
      "Taban kayasındaki sert bir çıkıntı etrafında oluşan girdap, zamanla küçük çakılları döndürerek kayayı aşındırır ve dairesel 'pothole' çukurları oluşturur. Bu çukurlar hem girdap etkisiyle malzemeyi içeride tutar hem de yıllar boyunca biriken ağır mineralleri hapseder. Bir pothole'u bulup dibine kadar temizlemek, tek seferde yüksek verim sağlayabilir.",
    icon: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="M10 6a4 4 0 0 1 4 4" />
      </>
    ),
  },
  {
    id: "savak-egimi",
    category: "technique",
    title: "Savak Eğimi ve Su Debisi Dengesi",
    summary: "Yanlış eğim ya da debi, ince altını gözünüzün önünde kaybettirir.",
    detail:
      "Savak (sluice box) genellikle 10-15 derece arası bir eğimle kurulur; su akışının kapanların (riffle) arkasında hafif bir girdap oluşturacak kadar güçlü ama malzemeyi sürükleyip atacak kadar hızlı olmaması gerekir. Debi çok düşükse malzeme birikip tıkanır, çok yüksekse ince ve pul altın kapanların üzerinden atlayıp kaybolur. Doğru dengeyi bulmak için küçük ayarlamalarla test yapmak şarttır.",
    icon: (
      <>
        <path d="M2 15h5l9-9h2" />
        <path d="M11 6v4h4" />
      </>
    ),
  },
  {
    id: "panlama-adimlari",
    category: "technique",
    title: "Doğru Panlama Adımları",
    summary: "Sabırlı ve düzenli bir teknik, panda kalan altını kaybetmenizi önler.",
    detail:
      "Pan içindeki malzeme önce suya batırılıp büyük taşlar elle ayıklanır, ardından pan hafifçe yatay çalkalanarak ağır mineraller dibe çöker. Sonrasında pan öne-arkaya eğilerek hafif malzeme kenarlardan suyla birlikte dökülür. Bu 'çalkala-eğ-dök' döngüsü, dipte sadece siyah kum ve altın kalana kadar sabırla tekrarlanır; acele edilen her adım ince altının kayıp olmasına yol açar.",
    icon: (
      <>
        <path d="M10 3a7 7 0 1 0 7 7" />
        <path d="M17 3v4h-4" />
      </>
    ),
  },
];

export default function GuideBoard() {
  const [category, setCategory] = useState<Category>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredItems =
    category === "all"
      ? GUIDE_ITEMS
      : GUIDE_ITEMS.filter((item) => item.category === category);

  return (
    <div>
      <div className="-mx-1 flex flex-wrap gap-2 px-1">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setCategory(tab.value)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              category === tab.value
                ? "bg-accent text-accent-foreground"
                : "border border-border bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {filteredItems.map((item) => {
          const isOpen = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    {item.icon}
                  </svg>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                  {CATEGORY_LABELS[item.category]}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.summary}
              </p>

              <button
                type="button"
                onClick={() => setExpandedId(isOpen ? null : item.id)}
                className="mt-4 flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-accent-strong"
              >
                {isOpen ? "Detayı gizle" : "Detayı gör"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="M5 8l5 5 5-5" />
                </svg>
              </button>

              {isOpen && (
                <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-foreground">
                  {item.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
