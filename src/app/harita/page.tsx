import Header from "@/components/Header";
import Map from "@/components/Map";
import { createClient } from "@/lib/supabase/server";
import { getGeologicalZones } from "@/lib/supabase/geological";
import type { GeologicalZone } from "@/types/geological";

async function loadZones(): Promise<GeologicalZone[]> {
  try {
    const supabase = await createClient();
    return await getGeologicalZones(supabase);
  } catch {
    return [];
  }
}

export default async function HaritaPage() {
  const zones = await loadZones();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Potansiyel Altın Haritası
        </h1>
        <p className="mt-2 text-sm text-muted">
          Jeolojik bölgeleri türe göre filtrele, bir noktaya tıklayarak
          detaylarını gör.
        </p>

        <div className="mt-8">
          <Map zones={zones} />
        </div>
      </main>
    </>
  );
}
