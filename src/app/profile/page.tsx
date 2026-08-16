import { redirect } from "next/navigation";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { createClient } from "@/lib/supabase/server";
import { getPostsByUserId } from "@/lib/supabase/posts";
import { getLikedPostIds } from "@/lib/supabase/likes";
import type { Profile } from "@/lib/supabase/AuthProvider";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [{ data: profile }, posts] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    getPostsByUserId(supabase, user.id),
  ]);

  if (!profile) redirect("/login");

  const likedIds = await getLikedPostIds(
    supabase,
    user.id,
    posts.map((post) => post.id),
  );
  const postsWithLikes = posts.map((post) => ({
    ...post,
    liked_by_me: likedIds.has(post.id),
  }));

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <ProfileHeader profile={profile} />

        <h2 className="mt-10 text-xl font-semibold tracking-tight text-foreground">
          Gönderilerim
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {postsWithLikes.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
              <p className="text-sm text-muted">
                Henüz bir gönderin yok. İlk paylaşımı sen yap!
              </p>
            </div>
          )}

          {postsWithLikes.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}
