import Header from "@/components/Header";
import CreateDiscoveryButton from "@/components/CreateDiscoveryButton";
import DiscoveryCard from "@/components/DiscoveryCard";
import { createClient } from "@/lib/supabase/server";
import { getDiscoveries, type Discovery } from "@/lib/supabase/discoveries";

type LoadDiscoveriesResult = {
  discoveries: Discovery[];
  error: string | null;
};

async function loadDiscoveries(): Promise<LoadDiscoveriesResult> {
  try {
    const supabase = await createClient();
    const discoveries = await getDiscoveries(supabase);
    return { discoveries, error: null };
  } catch (err) {
    return {
      discoveries: [],
      error:
        err instanceof Error
          ? err.message
          : "Keşif kayıtları yüklenirken bir hata oluştu.",
    };
  }
}

export default async function KesiflerPage() {
  const { discoveries, error } = await loadDiscoveries();

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Keşif Kayıtları
            </h1>
            <p className="mt-2 text-sm text-muted">
              İl, ilçe, kayaç türü ve mineral izlerini içeren saha
              kayıtların.
            </p>
          </div>
          <CreateDiscoveryButton />
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-400/5 px-6 py-10 text-center">
              <p className="text-sm font-medium text-red-400">
                Keşif kayıtları yüklenemedi.
              </p>
              <p className="mt-1 text-xs text-red-400/80">{error}</p>
            </div>
          )}

          {!error && discoveries.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
              <p className="text-sm text-muted">
                Henüz keşif kaydı yok. İlk kaydı sen oluştur!
              </p>
            </div>
          )}

          {!error &&
            discoveries.map((discovery) => (
              <DiscoveryCard key={discovery.id} discovery={discovery} />
            ))}
        </div>
      </main>
    </>
  );
}
