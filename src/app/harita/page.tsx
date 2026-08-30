import type { Metadata } from "next";
import Header from "@/components/Header";
import Map from "@/components/Map";
import { createClient } from "@/lib/supabase/server";
import { getGeologicalZones } from "@/lib/supabase/geological";
import { getDiscoveries, type Discovery } from "@/lib/supabase/discoveries";
import type { GeologicalZone } from "@/types/geological";

export const metadata: Metadata = {
  title: "Türkiye Altın ve Jeoloji Haritası",
  description:
    "Kuvars damarları, jeotermal hatlar, maden sahaları ve plaser altın bölgeleri — MTA kaynaklı, kanıt düzeyi etiketli interaktif Türkiye haritası.",
  alternates: {
    canonical: "/harita",
  },
};

async function loadZones(): Promise<GeologicalZone[]> {
  try {
    const supabase = await createClient();
    return await getGeologicalZones(supabase);
  } catch {
    return [];
  }
}

async function loadMyDiscoveries(): Promise<{
  discoveries: Discovery[];
  isAuthenticated: boolean;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { discoveries: [], isAuthenticated: false };

    const discoveries = await getDiscoveries(supabase, {
      onlyWithCoordinates: true,
    });
    return { discoveries, isAuthenticated: true };
  } catch {
    return { discoveries: [], isAuthenticated: false };
  }
}

export default async function HaritaPage() {
  const [zones, { discoveries: myDiscoveries, isAuthenticated }] =
    await Promise.all([loadZones(), loadMyDiscoveries()]);

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Potansiyel Altın Haritası
        </h1>
        <p className="mt-2 text-sm text-muted">
          Türkiye genelindeki kaynaklı jeolojik kayıtları incele, bölge ve
          cevherleşme türüne göre filtrele.
        </p>

        <div className="mt-8">
          <Map
            zones={zones}
            myDiscoveries={myDiscoveries}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </main>
    </>
  );
}
