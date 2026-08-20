"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { useAuthModal } from "@/components/auth/AuthModalProvider";
import CreateDiscoveryModal from "@/components/CreateDiscoveryModal";

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

export default function CreateDiscoveryButton() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const router = useRouter();

  function handleClick() {
    if (user) {
      setOpen(true);
    } else {
      openAuthModal("sign-in");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong sm:px-5"
      >
        <PlusIcon />
        Yeni Kayıt
      </button>

      <CreateDiscoveryModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={() => router.refresh()}
      />
    </>
  );
}
