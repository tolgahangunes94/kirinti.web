import type { Discovery } from "@/lib/supabase/discoveries";
import DeleteDiscoveryButton from "@/components/DeleteDiscoveryButton";
import PostImage from "@/components/PostImage";

function RockIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M3 13.5 5.5 7l3 2 2.5-4 4 3.5 2 5H3Z" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <path d="M10 18s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

type DiscoveryCardProps = {
  discovery: Discovery;
};

export default function DiscoveryCard({ discovery }: DiscoveryCardProps) {
  const location = discovery.district
    ? `${discovery.city} / ${discovery.district}`
    : discovery.city;

  return (
    <article className="relative flex items-start gap-4 rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      <div className="absolute right-3 top-3">
        <DeleteDiscoveryButton
          discoveryId={discovery.id}
          imageUrl={discovery.image_url}
          ownerId={discovery.user_id}
        />
      </div>

      {discovery.image_url ? (
        <PostImage imageUrl={discovery.image_url} alt={location} />
      ) : (
        <div className="bg-glow flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2 text-accent/70">
          <RockIcon />
        </div>
      )}

      <div className="min-w-0 flex-1 pr-8">
        <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
          <LocationIcon />
          {location}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {discovery.rock_type && (
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
              Kayaç: {discovery.rock_type}
            </span>
          )}
          {discovery.mineral_trace && (
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
              Mineral izi: {discovery.mineral_trace}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
