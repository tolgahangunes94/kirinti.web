import type { ReactNode } from "react";

export type FeaturedGuideCategory = "geology" | "stream" | "technique";

export const FEATURED_GUIDE_CATEGORY_LABELS: Record<
  FeaturedGuideCategory,
  string
> = {
  geology: "Jeoloji & Kayaçlar",
  stream: "Dere Mantığı & Kapanlar",
  technique: "Saha Teknikleri",
};

export type FeaturedGuide = {
  id: string;
  title: string;
  category: FeaturedGuideCategory;
  /** Only set once a dedicated detail page exists for this guide. */
  href?: string;
  /** Real photo, used only when one is actually available for the topic. */
  image?: {
    src: string;
    alt: string;
  };
  /** Fallback icon shown on a premium gradient card when no photo exists yet. */
  icon: ReactNode;
};

export const FEATURED_GUIDES: FeaturedGuide[] = [
  {
    id: "dere-kivrimlarinda-altin",
    title: "Dere Kıvrımlarında Altın",
    category: "stream",
    href: "/rehber/dere-kivrimlarinda-altin",
    image: {
      src: "/images/rehber/dere-kivrimlarinda-altin-hero.png",
      alt: "Bir dere yatağının iç virajında akıntının yavaşlayıp ağır mineralleri biriktirdiği bölgeyi gösteren şematik görsel",
    },
    icon: <path d="M3 4c0 4 8 2 8 7s6 3 6 5" />,
  },
  {
    id: "kuvars-damarlari",
    title: "Kuvars Damarları",
    category: "geology",
    href: "/rehber/kuvars-damarlari",
    image: {
      src: "/images/rehber/kuvars-damarlari-hero.png",
      alt: "Ana kayaç içinde pas lekeli, gözenekli bir kuvars damarını gösteren yakın çekim fotoğraf",
    },
    icon: <path d="M10 2 4 8l6 10 6-10-6-6Z" />,
  },
  {
    id: "siyah-kum",
    title: "Siyah Kum",
    category: "geology",
    href: "/rehber/siyah-kum",
    image: {
      src: "/images/rehber/siyah-kum-hero.png",
      alt: "Dere kıyısında biriken koyu renkli manyetit ve ilmenit tanecikli siyah kum tabakasını gösteren fotoğraf",
    },
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
    id: "taban-kayasi",
    title: "Taban Kayası Çatlakları",
    category: "stream",
    href: "/rehber/taban-kayasi-catlaklari",
    image: {
      src: "/images/rehber/taban-kayasi-catlaklari-hero.png",
      alt: "Bir akarsu yatağındaki taban kayası çatlaklarını gösteren yakın çekim fotoğraf",
    },
    icon: <path d="M3 16 7 9l2 3 2-5 3 4 3-3" />,
  },
  {
    id: "panlama-adimlari",
    title: "Panlama Adımları",
    category: "technique",
    href: "/rehber/panlama-adimlari",
    image: {
      src: "/images/rehber/panlama-adimlari-hero.png",
      alt: "Bir altın panının su içinde çalkalanarak ağır minerallerin dipte biriktirilmesini gösteren fotoğraf",
    },
    icon: (
      <>
        <path d="M10 3a7 7 0 1 0 7 7" />
        <path d="M17 3v4h-4" />
      </>
    ),
  },
];
