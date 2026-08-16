export type GeologicalZone = {
  id: string;
  title: string;
  zone_type: string;
  city: string | null;
  region: string | null;
  description: string | null;
  potential_level: string | null;
  latitude: number;
  longitude: number;
  created_at: string;
};
