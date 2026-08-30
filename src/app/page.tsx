import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import WhatIsKirintiMining from "@/components/WhatIsKirintiMining";
import About from "@/components/About";
import RecentPosts from "@/components/RecentPosts";
import CommunityCta from "@/components/CommunityCta";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { getPosts, type Post } from "@/lib/supabase/posts";
import { getLikedPostIds } from "@/lib/supabase/likes";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

async function loadPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const posts = await getPosts(supabase);
    if (!user) return posts;

    const likedIds = await getLikedPostIds(
      supabase,
      user.id,
      posts.map((post) => post.id),
    );

    return posts.map((post) => ({
      ...post,
      liked_by_me: likedIds.has(post.id),
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await loadPosts();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <Features />
        <WhatIsKirintiMining />
        <RecentPosts posts={posts} />
        <About />
        <CommunityCta />
      </main>
      <Footer />
    </>
  );
}
