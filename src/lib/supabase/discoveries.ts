import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "./client";

const DISCOVERIES_BUCKET = "discoveries";
const SIGNED_URL_EXPIRES_IN = 3600;

export const MAX_DISCOVERY_IMAGES = 3;

export type DiscoveryImage = {
  id: string;
  image_path: string;
  position: number;
  url?: string;
};

export type Discovery = {
  id: string;
  user_id: string;
  city: string;
  district: string;
  village_or_area: string | null;
  stream_or_site_name: string | null;
  rock_type: string | null;
  field_notes: string;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  images: DiscoveryImage[];
};

export type CreateDiscoveryInput = {
  city: string;
  district: string;
  village_or_area?: string | null;
  stream_or_site_name?: string | null;
  rock_type?: string | null;
  field_notes: string;
  latitude?: number | null;
  longitude?: number | null;
  image_paths?: string[];
};

export type UpdateDiscoveryInput = {
  city: string;
  district: string;
  village_or_area?: string | null;
  stream_or_site_name?: string | null;
  rock_type?: string | null;
  field_notes: string;
  latitude?: number | null;
  longitude?: number | null;
};

export type GetDiscoveriesOptions = {
  limit?: number;
  onlyWithCoordinates?: boolean;
};

type DiscoveryRow = Omit<Discovery, "images"> & {
  discovery_images: Omit<DiscoveryImage, "url">[];
};

async function getSignedImageUrls(
  supabase: SupabaseClient,
  paths: string[],
): Promise<Map<string, string>> {
  if (paths.length === 0) return new Map();

  const { data, error } = await supabase.storage
    .from(DISCOVERIES_BUCKET)
    .createSignedUrls(paths, SIGNED_URL_EXPIRES_IN);

  if (error) throw error;

  const map = new Map<string, string>();
  for (const item of data ?? []) {
    if (item.path && item.signedUrl) map.set(item.path, item.signedUrl);
  }
  return map;
}

export async function getDiscoveries(
  supabase: SupabaseClient,
  options: GetDiscoveriesOptions = {},
): Promise<Discovery[]> {
  const { limit = 20, onlyWithCoordinates = false } = options;

  let query = supabase
    .from("discoveries")
    .select("*, discovery_images(id, image_path, position)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (onlyWithCoordinates) {
    query = query.not("latitude", "is", null).not("longitude", "is", null);
  }

  const { data, error } = await query;

  if (error) throw error;

  const rows = (data ?? []) as DiscoveryRow[];
  const allPaths = rows.flatMap((row) =>
    row.discovery_images.map((img) => img.image_path),
  );
  const signedUrls = await getSignedImageUrls(supabase, allPaths);

  return rows.map(({ discovery_images, ...row }) => ({
    ...row,
    images: discovery_images
      .slice()
      .sort((a, b) => a.position - b.position)
      .map((img) => ({ ...img, url: signedUrls.get(img.image_path) })),
  }));
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
      district: input.district,
      village_or_area: input.village_or_area || null,
      stream_or_site_name: input.stream_or_site_name || null,
      rock_type: input.rock_type || null,
      field_notes: input.field_notes,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
    })
    .select()
    .single();

  if (error) throw error;

  const imagePaths = (input.image_paths ?? []).slice(0, MAX_DISCOVERY_IMAGES);

  if (imagePaths.length > 0) {
    const { error: imagesError } = await supabase
      .from("discovery_images")
      .insert(
        imagePaths.map((path, index) => ({
          discovery_id: data.id,
          user_id: user.id,
          image_path: path,
          position: index,
        })),
      );

    if (imagesError) throw imagesError;
  }

  return { ...data, images: [] };
}

export async function updateDiscovery(
  supabase: SupabaseClient,
  discoveryId: string,
  input: UpdateDiscoveryInput,
): Promise<Discovery> {
  const { data, error } = await supabase
    .from("discoveries")
    .update({
      city: input.city,
      district: input.district,
      village_or_area: input.village_or_area || null,
      stream_or_site_name: input.stream_or_site_name || null,
      rock_type: input.rock_type || null,
      field_notes: input.field_notes,
      latitude: input.latitude ?? null,
      longitude: input.longitude ?? null,
    })
    .eq("id", discoveryId)
    .select();

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error(
      "Keşif kaydı güncellenemedi. Bu kaydın sahibi olmayabilirsin.",
    );
  }

  return { ...data[0], images: [] };
}

export async function addDiscoveryImage(
  supabase: SupabaseClient,
  discoveryId: string,
  position: number,
  imagePath: string,
): Promise<DiscoveryImage> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Görsel eklemek için giriş yapmalısın.");

  const { data, error } = await supabase
    .from("discovery_images")
    .insert({
      discovery_id: discoveryId,
      user_id: user.id,
      image_path: imagePath,
      position,
    })
    .select("id, image_path, position")
    .single();

  if (error) throw error;

  const signedUrls = await getSignedImageUrls(supabase, [imagePath]);

  return { ...data, url: signedUrls.get(imagePath) };
}

export async function deleteDiscoveryImage(
  supabase: SupabaseClient,
  imageId: string,
): Promise<void> {
  const { data, error } = await supabase
    .from("discovery_images")
    .delete()
    .eq("id", imageId)
    .select("image_path");

  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error(
      "Görsel silinemedi. Bu görselin sahibi olmayabilirsin.",
    );
  }

  try {
    await supabase.storage
      .from(DISCOVERIES_BUCKET)
      .remove([data[0].image_path]);
  } catch {
    // Görsel kaydı zaten silindi; storage dosyası silinemese de işlemi engelleme.
  }
}

export async function deleteDiscovery(
  supabase: SupabaseClient,
  discoveryId: string,
): Promise<void> {
  const { data: images } = await supabase
    .from("discovery_images")
    .select("image_path")
    .eq("discovery_id", discoveryId);

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

  const paths = (images ?? []).map((img) => img.image_path);
  if (paths.length > 0) {
    try {
      await supabase.storage.from(DISCOVERIES_BUCKET).remove(paths);
    } catch {
      // Kayıt zaten silindi; görseller silinemese de işlemi engelleme.
    }
  }
}

export async function uploadDiscoveryImage(
  file: File,
  userId: string,
): Promise<{ path: string }> {
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
  return { path };
}

export async function deleteDiscoveryImageByPath(path: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from(DISCOVERIES_BUCKET)
    .remove([path]);

  if (error) throw error;
}
