import type { Profile } from "@/lib/supabase/AuthProvider";
import { getInitials } from "@/lib/getInitials";

type ProfileHeaderProps = {
  profile: Profile;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-center gap-4">
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt={profile.full_name ?? "Profil fotoğrafı"}
            className="h-20 w-20 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
            {getInitials(profile.full_name)}
          </span>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-foreground">
            {profile.full_name ?? "İsimsiz Keşifçi"}
          </h1>
          <span className="mt-1.5 inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
            {profile.title ?? "Yeni Keşifçi"}
          </span>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-muted">
        <span className="text-accent">
          {profile.points.toLocaleString("tr-TR")}
        </span>{" "}
        Puan
      </p>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
        {[
          { label: "Gönderi", value: profile.post_count },
          { label: "Keşif", value: profile.discovery_count },
          { label: "Takipçi", value: profile.follower_count },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-lg font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
