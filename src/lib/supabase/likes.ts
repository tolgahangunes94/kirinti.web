import type { SupabaseClient } from "@supabase/supabase-js";

export async function getLikedPostIds(
  supabase: SupabaseClient,
  userId: string,
  postIds: string[],
): Promise<Set<string>> {
  if (postIds.length === 0) return new Set();

  const { data, error } = await supabase
    .from("post_likes")
    .select("post_id")
    .eq("user_id", userId)
    .in("post_id", postIds);

  if (error) throw error;
  return new Set((data ?? []).map((like) => like.post_id));
}

export async function likePost(
  supabase: SupabaseClient,
  postId: string,
  userId: string,
): Promise<void> {
  const { error } = await supabase
    .from("post_likes")
    .insert({ post_id: postId, user_id: userId });

  if (error) throw error;
}

export async function unlikePost(
  supabase: SupabaseClient,
  postId: string,
  userId: string,
): Promise<void> {
  const { error } = await supabase
    .from("post_likes")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);

  if (error) throw error;
}
