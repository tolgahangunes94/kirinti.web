"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import CreatePostModal from "@/components/CreatePostModal";
import { getInitials } from "@/lib/getInitials";

function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 17H4.5A1.5 1.5 0 0 1 3 15.5v-11A1.5 1.5 0 0 1 4.5 3H8M13 14l4-4-4-4M17 10H7" />
    </svg>
  );
}

export default function Header() {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const { user, profile } = useAuth();
  const router = useRouter();

  function handleCtaClick() {
    if (user) {
      setCreatePostOpen(true);
    } else {
      openAuthModal("sign-up");
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-20 h-16 w-full border-b border-amber-500/10 bg-[#0B0F17]/90 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-6xl items-center px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
                K
              </span>
              <span className="hidden text-base font-semibold tracking-tight sm:inline">
                Kırıntı <span className="text-accent">Madencilik</span>
              </span>
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong sm:px-5"
            >
              {user && <PlusIcon />}
              {user ? "Keşif Paylaş" : "Topluluğa Katıl"}
            </button>

            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                title="Çıkış Yap"
                aria-label="Çıkış Yap"
                className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2 text-xs font-bold text-foreground transition-colors hover:border-accent/60"
              >
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{getInitials(profile?.full_name)}</span>
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <LogoutIcon />
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      <CreatePostModal
        open={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
        onCreated={() => router.refresh()}
      />
    </>
  );
}
