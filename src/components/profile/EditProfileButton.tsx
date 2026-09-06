"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type Profile } from "@/lib/supabase/AuthProvider";
import EditProfileModal from "@/components/profile/EditProfileModal";

function EditIcon() {
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
      <path d="M13.5 3.5a2.1 2.1 0 0 1 3 3L7 16l-4 1 1-4 9.5-9.5Z" />
    </svg>
  );
}

type EditProfileButtonProps = {
  profile: Profile;
};

export default function EditProfileButton({ profile }: EditProfileButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (user?.id !== profile.id) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Profili düzenle"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-2 text-muted transition-colors hover:border-accent/60 hover:text-accent"
      >
        <EditIcon />
      </button>

      <EditProfileModal
        open={open}
        profile={profile}
        onClose={() => setOpen(false)}
        onUpdated={() => router.refresh()}
      />
    </>
  );
}
