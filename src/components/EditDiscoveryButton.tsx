"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";
import type { Discovery } from "@/lib/supabase/discoveries";
import EditDiscoveryModal from "@/components/EditDiscoveryModal";

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

type EditDiscoveryButtonProps = {
  discovery: Discovery;
};

export default function EditDiscoveryButton({
  discovery,
}: EditDiscoveryButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  if (user?.id !== discovery.user_id) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Keşfi düzenle"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-black/70 hover:text-accent"
      >
        <EditIcon />
      </button>

      <EditDiscoveryModal
        open={open}
        discovery={discovery}
        onClose={() => setOpen(false)}
        onUpdated={() => router.refresh()}
      />
    </>
  );
}
