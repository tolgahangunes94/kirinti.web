import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostImage from "@/components/PostImage";
import EditDiscoveryButton from "@/components/EditDiscoveryButton";
import { createClient } from "@/lib/supabase/server";
import { getDiscoveryById } from "@/lib/supabase/discoveries";

type DiscoveryPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DiscoveryPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const discovery = await getDiscoveryById(supabase, id);

  return {
    title: discovery ? `${discovery.city} / ${discovery.district} — Keşfim` : "Keşfim",
    robots: { index: false, follow: false },
  };
}

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

function BackToDiscoveriesLink() {
  return (
    <Link
      href="/kesifler"
      className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 4 6 10l6 6" />
      </svg>
      Keşiflerim&apos;e dön
    </Link>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DiscoveryDetailPage({
  params,
}: DiscoveryPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const discovery = await getDiscoveryById(supabase, id);

  if (!discovery) notFound();

  const location = `${discovery.city} / ${discovery.district}`;

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <BackToDiscoveriesLink />

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {location}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent">
              <LockIcon />
              Bu keşif kaydı yalnızca sana görünür.
            </p>
          </div>
          <EditDiscoveryButton discovery={discovery} />
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <div className="space-y-2.5 text-sm">
            <div className="flex items-start justify-between gap-3">
              <span className="shrink-0 text-xs text-muted">İl / İlçe</span>
              <span className="text-right font-medium text-foreground">
                {location}
              </span>
            </div>

            {discovery.village_or_area && (
              <div className="flex items-start justify-between gap-3">
                <span className="shrink-0 text-xs text-muted">
                  Köy / Mevki
                </span>
                <span className="text-right font-medium text-foreground">
                  {discovery.village_or_area}
                </span>
              </div>
            )}

            {discovery.stream_or_site_name && (
              <div className="flex items-start justify-between gap-3">
                <span className="shrink-0 text-xs text-muted">
                  Dere / Saha
                </span>
                <span className="text-right font-medium text-foreground">
                  {discovery.stream_or_site_name}
                </span>
              </div>
            )}

            {discovery.rock_type && (
              <div className="flex items-start justify-between gap-3">
                <span className="shrink-0 text-xs text-muted">
                  Kayaç Türü
                </span>
                <span className="text-right font-medium text-foreground">
                  {discovery.rock_type}
                </span>
              </div>
            )}

            {discovery.latitude !== null && discovery.longitude !== null && (
              <div className="flex items-start justify-between gap-3">
                <span className="shrink-0 text-xs text-muted">Koordinat</span>
                <span className="text-right font-medium text-foreground">
                  {discovery.latitude.toFixed(5)},{" "}
                  {discovery.longitude.toFixed(5)}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <p className="text-xs font-medium text-muted">Saha Notu</p>
            <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">
              {discovery.field_notes}
            </p>
          </div>

          {discovery.images.length > 0 && (
            <div className="mt-4 flex gap-2">
              {discovery.images.map(
                (image) =>
                  image.url && (
                    <PostImage
                      key={image.id}
                      imageUrl={image.url}
                      alt={location}
                    />
                  ),
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-muted">
            {formatDate(discovery.created_at)}
          </p>
        </div>
      </main>
    </>
  );
}
