import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://kirintimadencilik.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/harita`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/rehber`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${BASE_URL}/rehber/dere-kivrimlarinda-altin`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { data: posts } = await supabase
      .from("posts")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    postRoutes = (posts ?? []).map((post) => ({
      url: `${BASE_URL}/post/${post.id}`,
      lastModified: post.created_at,
      changeFrequency: "yearly",
      priority: 0.5,
    }));
  } catch {
    postRoutes = [];
  }

  return [...staticRoutes, ...postRoutes];
}
