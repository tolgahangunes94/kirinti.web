import type { SupabaseClient } from "@supabase/supabase-js";

export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export type CommentWithAuthor = Comment & {
  author_full_name: string | null;
  author_avatar_url: string | null;
};

export async function getCommentsByPostId(
  supabase: SupabaseClient,
  postId: string,
): Promise<CommentWithAuthor[]> {
  const { data: comments, error } = await supabase
    .from("post_comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  if (!comments || comments.length === 0) return [];

  const userIds = [...new Set(comments.map((comment) => comment.user_id))];

  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .in("id", userIds);

  if (profilesError) throw profilesError;

  const profileById = new Map(
    (profiles ?? []).map((profile) => [profile.id, profile]),
  );

  return comments.map((comment) => ({
    ...comment,
    author_full_name: profileById.get(comment.user_id)?.full_name ?? null,
    author_avatar_url: profileById.get(comment.user_id)?.avatar_url ?? null,
  }));
}

export type CreateCommentInput = {
  post_id: string;
  content: string;
};

export async function createComment(
  supabase: SupabaseClient,
  input: CreateCommentInput,
): Promise<Comment> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Yorum yapmak için giriş yapmalısın.");

  const content = input.content.trim();
  if (!content) throw new Error("Yorum boş olamaz.");

  const { data, error } = await supabase
    .from("post_comments")
    .insert({
      post_id: input.post_id,
      user_id: user.id,
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(
  supabase: SupabaseClient,
  commentId: string,
): Promise<void> {
  const { error } = await supabase
    .from("post_comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
}
