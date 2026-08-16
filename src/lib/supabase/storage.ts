import { createClient } from "./client";

const POSTS_BUCKET = "posts";

export type UploadedImage = {
  path: string;
  url: string;
};

export function getPostImageUrl(path: string) {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(POSTS_BUCKET).getPublicUrl(path);
  return publicUrl;
}

export async function uploadPostImage(
  file: File,
  userId: string,
): Promise<UploadedImage> {
  const supabase = createClient();

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(POSTS_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  return { path, url: getPostImageUrl(path) };
}

export async function deletePostImage(imageUrl: string | null): Promise<void> {
  if (!imageUrl) return;

  const marker = `/storage/v1/object/public/${POSTS_BUCKET}/`;
  const markerIndex = imageUrl.indexOf(marker);
  if (markerIndex === -1) return;

  const path = imageUrl.slice(markerIndex + marker.length);
  if (!path) return;

  const supabase = createClient();
  const { error } = await supabase.storage.from(POSTS_BUCKET).remove([path]);

  if (error) throw error;
}
