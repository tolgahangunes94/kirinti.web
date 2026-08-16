import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Features from "@/components/Features";
import About from "@/components/About";
import RecentPosts from "@/components/RecentPosts";
import CommunityCta from "@/components/CommunityCta";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { getPosts, type Post } from "@/lib/supabase/posts";
import { getLikedPostIds } from "@/lib/supabase/likes";

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
        <About />
        <RecentPosts posts={posts} />
        <CommunityCta />
      </main>
      <Footer />
    </>
  );
}
