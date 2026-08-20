import Header from "@/components/Header";
import CreateDiscoveryButton from "@/components/CreateDiscoveryButton";
import DiscoveryList from "@/components/DiscoveryList";
import { createClient } from "@/lib/supabase/server";
import { getDiscoveries, type Discovery } from "@/lib/supabase/discoveries";

function LockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
    </svg>
  );
}

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
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Keşiflerim 🔒
            </h1>
            <p className="mt-2 text-sm text-muted">Kişisel saha günlüğün</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent">
              <LockIcon />
              Bu keşif kayıtları yalnızca sana görünür.
            </p>
          </div>
          <CreateDiscoveryButton />
        </div>

        <div className="mt-8">
          {error ? (
            <div className="rounded-2xl border border-red-400/30 bg-red-400/5 px-6 py-10 text-center">
              <p className="text-sm font-medium text-red-400">
                Keşif kayıtları yüklenemedi.
              </p>
              <p className="mt-1 text-xs text-red-400/80">{error}</p>
            </div>
          ) : (
            <DiscoveryList discoveries={discoveries} />
          )}
        </div>
      </main>
    </>
  );
}
