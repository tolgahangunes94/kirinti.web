import type { SupabaseClient } from "@supabase/supabase-js";

export type Post = {
  id: string;
  user_id: string;
  location: string | null;
  description: string;
  image_url: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  liked_by_me?: boolean;
};

export type CreatePostInput = {
  location?: string | null;
  description: string;
  image_url?: string | null;
};

export async function getPosts(
  supabase: SupabaseClient,
  limit = 20,
): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getPostsByUserId(
  supabase: SupabaseClient,
  userId: string,
  limit = 20,
): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function getPostById(
  supabase: SupabaseClient,
  id: string,
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function deletePost(
  supabase: SupabaseClient,
  postId: string,
): Promise<void> {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Gönderi silinemedi. Bu gönderinin sahibi olmayabilirsin.");
  }
}

export async function createPost(
  supabase: SupabaseClient,
  input: CreatePostInput,
): Promise<Post> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Gönderi paylaşmak için giriş yapmalısın.");

  const { data, error } = await supabase
    .from("posts")
    .insert({
      user_id: user.id,
      location: input.location || null,
      description: input.description,
      image_url: input.image_url || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
