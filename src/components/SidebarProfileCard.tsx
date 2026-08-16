"use client";

import Link from "next/link";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { getInitials } from "@/lib/getInitials";

export default function SidebarProfileCard() {
  const { user, profile, loading } = useAuth();
  const { openAuthModal } = useAuthModal();

  if (loading) {
    return (
      <div className="border-b border-border p-5">
        <div className="flex items-center gap-3">
          <span className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-surface-2" />
          <div className="min-w-0 flex-1 space-y-2">
            <span className="block h-3 w-24 animate-pulse rounded bg-surface-2" />
            <span className="block h-3 w-16 animate-pulse rounded bg-surface-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="border-b border-border p-5">
        <p className="text-sm font-semibold text-foreground">Misafir</p>
        <p className="mt-1 text-xs leading-relaxed text-muted">
          Profilini görmek ve topluluğa katılmak için giriş yap.
        </p>
        <button
          type="button"
          onClick={() => openAuthModal("sign-in")}
          className="mt-4 w-full rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Giriş Yap / Katıl
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/profile"
      className="block border-b border-border p-5 transition-colors hover:bg-surface-2"
    >
      <div className="flex items-center gap-3">
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name ?? "Profil fotoğrafı"}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
            {getInitials(profile.full_name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {profile.full_name ?? "İsimsiz Keşifçi"}
          </p>
          <span className="mt-1 inline-flex items-center rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
            {profile.title ?? "Yeni Keşifçi"}
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs font-medium text-muted">
        <span className="text-accent">
          {profile.points.toLocaleString("tr-TR")}
        </span>{" "}
        Puan
      </p>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
        {[
          { label: "Gönderi", value: profile.post_count },
          { label: "Keşif", value: profile.discovery_count },
          { label: "Takipçi", value: profile.follower_count },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-sm font-semibold text-foreground">
              {stat.value}
            </p>
            <p className="text-[10px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}
