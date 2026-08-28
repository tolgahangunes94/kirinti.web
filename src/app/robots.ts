import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/kesifler", "/profile", "/login"],
      },
    ],
    sitemap: "https://kirintimadencilik.com/sitemap.xml",
  };
}
