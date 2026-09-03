import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KırıntıMadencilik.com",
    short_name: "KırıntıMadencilik",
    description:
      "Kırıntı madencilik meraklıları için Türkiye'nin saha ve jeoloji platformu.",
    start_url: "/",
    display: "standalone",
    background_color: "#08090b",
    theme_color: "#08090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
