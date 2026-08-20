import type { Discovery } from "@/lib/supabase/discoveries";
import DeleteDiscoveryButton from "@/components/DeleteDiscoveryButton";
import PostImage from "@/components/PostImage";

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

function LockIcon() {
  return (
    <svg
      width="11"
      height="11"
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type DiscoveryCardProps = {
  discovery: Discovery;
};

export default function DiscoveryCard({ discovery }: DiscoveryCardProps) {
  const location = `${discovery.city} / ${discovery.district}`;

  return (
    <article className="relative rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-accent/40">
      <div className="absolute right-3 top-3">
        <DeleteDiscoveryButton
          discoveryId={discovery.id}
          ownerId={discovery.user_id}
        />
      </div>

      <div className="flex items-start justify-between gap-2 pr-8">
        <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
          <LocationIcon />
          {location}
        </div>

        <span className="flex shrink-0 items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-medium text-muted">
          <LockIcon />
          Sadece sana görünür
        </span>
      </div>

      {(discovery.village_or_area ||
        discovery.stream_or_site_name ||
        discovery.rock_type) && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {discovery.village_or_area && (
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
              Köy/Mevki: {discovery.village_or_area}
            </span>
          )}
          {discovery.stream_or_site_name && (
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
              Dere/Saha: {discovery.stream_or_site_name}
            </span>
          )}
          {discovery.rock_type && (
            <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
              Kayaç: {discovery.rock_type}
            </span>
          )}
        </div>
      )}

      <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
        {discovery.field_notes}
      </p>

      {discovery.images.length > 0 && (
        <div className="mt-3 flex gap-2">
          {discovery.images.map(
            (image) =>
              image.url && (
                <PostImage key={image.id} imageUrl={image.url} alt={location} />
              ),
          )}
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        {formatDate(discovery.created_at)}
      </p>
    </article>
  );
}
