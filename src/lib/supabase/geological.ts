import type { SupabaseClient } from "@supabase/supabase-js";
import type { GeologicalZone } from "@/types/geological";

export async function getGeologicalZones(
  supabase: SupabaseClient,
): Promise<GeologicalZone[]> {
  const { data, error } = await supabase
    .from("geological_zones")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}
