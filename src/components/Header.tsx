"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import { useAuth } from "@/lib/supabase/AuthProvider";
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
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { openAuthModal } = useAuthModal();
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!accountMenuOpen) return;

    function handleOutsideInteraction(event: MouseEvent | TouchEvent) {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setAccountMenuOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [accountMenuOpen]);

  function handleCtaClick() {
    if (user) {
      setCreatePostOpen(true);
    } else {
      openAuthModal("sign-up");
    }
  }

  async function handleSignOut() {
    setAccountMenuOpen(false);
    await signOut();
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
              {user ? "Gönderi Paylaş" : "Topluluğa Katıl"}
            </button>

            {user && (
              <div ref={accountMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  title="Hesabım"
                  aria-label="Hesabım"
                  aria-haspopup="menu"
                  aria-expanded={accountMenuOpen}
                  className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-2 text-xs font-bold text-foreground transition-colors hover:border-accent/60"
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
                </button>

                {accountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
                  >
                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setAccountMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-surface-2"
                    >
                      Profilim
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-surface-2"
                    >
                      <LogoutIcon />
                      Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
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
