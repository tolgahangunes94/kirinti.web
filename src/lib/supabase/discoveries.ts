import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./client";

const DISCOVERIES_BUCKET = "discoveries";

export type Discovery = {
  id: string;
  user_id: string;
  city: string;
  district: string | null;
  rock_type: string | null;
  mineral_trace: string | null;
  image_url: string | null;
  created_at: string;
};

export type CreateDiscoveryInput = {
  city: string;
  district?: string | null;
  rock_type?: string | null;
  mineral_trace?: string | null;
  image_url?: string | null;
};

export async function getDiscoveries(
  supabase: SupabaseClient,
  limit = 20,
): Promise<Discovery[]> {
  const { data, error } = await supabase
    .from("discoveries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}

export async function createDiscovery(
  supabase: SupabaseClient,
  input: CreateDiscoveryInput,
): Promise<Discovery> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Keşif kaydı oluşturmak için giriş yapmalısın.");

  const { data, error } = await supabase
    .from("discoveries")
    .insert({
      user_id: user.id,
      city: input.city,
      district: input.district || null,
      rock_type: input.rock_type || null,
      mineral_trace: input.mineral_trace || null,
      image_url: input.image_url || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDiscovery(
  supabase: SupabaseClient,
  discoveryId: string,
): Promise<void> {
  const { data, error } = await supabase
    .from("discoveries")
    .delete()
    .eq("id", discoveryId)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error(
      "Keşif kaydı silinemedi. Bu kaydın sahibi olmayabilirsin.",
    );
  }
}

export type UploadedDiscoveryImage = {
  path: string;
  url: string;
};

export function getDiscoveryImageUrl(path: string) {
  const supabase = createClient();
  const {
    data: { publicUrl },
  } = supabase.storage.from(DISCOVERIES_BUCKET).getPublicUrl(path);
  return publicUrl;
}

export async function uploadDiscoveryImage(
  file: File,
  userId: string,
): Promise<UploadedDiscoveryImage> {
  const supabase = createClient();

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(DISCOVERIES_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  return { path, url: getDiscoveryImageUrl(path) };
}

export async function deleteDiscoveryImage(
  imageUrl: string | null,
): Promise<void> {
  if (!imageUrl) return;

  const marker = `/storage/v1/object/public/${DISCOVERIES_BUCKET}/`;
  const markerIndex = imageUrl.indexOf(marker);
  if (markerIndex === -1) return;

  const path = imageUrl.slice(markerIndex + marker.length);
  if (!path) return;

  const supabase = createClient();
  const { error } = await supabase.storage
    .from(DISCOVERIES_BUCKET)
    .remove([path]);

  if (error) throw error;
}
