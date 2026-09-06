import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./client";

const AVATARS_BUCKET = "avatars";

export async function updateProfileName(
  supabase: SupabaseClient,
  fullName: string,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Profili güncellemek için giriş yapmalısın.");

  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: fullName })
    .eq("id", user.id)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Profil güncellenemedi. Bu profilin sahibi olmayabilirsin.");
  }
}

export function getAvatarImageUrl(path: string) {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(AVATARS_BUCKET).getPublicUrl(path);
  return publicUrl;
}

export async function uploadAvatarImage(
  file: File,
  userId: string,
): Promise<{ path: string; url: string }> {
  const supabase = createClient();

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  return { path, url: getAvatarImageUrl(path) };
}

export async function updateProfileAvatar(
  supabase: SupabaseClient,
  avatarUrl: string | null,
): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Avatarı güncellemek için giriş yapmalısın.");

  const { data, error } = await supabase
    .from("profiles")
    .update({ avatar_url: avatarUrl })
    .eq("id", user.id)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error("Avatar güncellenemedi. Bu profilin sahibi olmayabilirsin.");
  }
}

export async function deleteAvatarImage(avatarUrl: string | null): Promise<void> {
  if (!avatarUrl) return;

  const marker = `/storage/v1/object/public/${AVATARS_BUCKET}/`;
  const markerIndex = avatarUrl.indexOf(marker);
  if (markerIndex === -1) return;

  const path = avatarUrl.slice(markerIndex + marker.length);
  if (!path) return;

  const supabase = createClient();
  const { error } = await supabase.storage.from(AVATARS_BUCKET).remove([path]);

  if (error) throw error;
}
