"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { deleteDiscovery } from "@/lib/supabase/discoveries";

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6M6 6l.6 9.4A1.5 1.5 0 0 0 8.1 17h3.8a1.5 1.5 0 0 0 1.5-1.6L14 6" />
    </svg>
  );
}

type DeleteDiscoveryButtonProps = {
  discoveryId: string;
  ownerId: string;
};

export default function DeleteDiscoveryButton({
  discoveryId,
  ownerId,
}: DeleteDiscoveryButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user?.id !== ownerId) return null;

  async function handleDelete() {
    if (!window.confirm("Bu keşif kaydını silmek istediğine emin misin?"))
      return;

    setDeleting(true);
    setError(null);

    try {
      const supabase = createClient();
      await deleteDiscovery(supabase, discoveryId);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Keşif kaydı silinirken bir hata oluştu.",
      );
      setDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        aria-label="Keşif kaydını sil"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 transition-colors hover:bg-black/70 hover:text-red-400 disabled:opacity-60"
      >
        <TrashIcon />
      </button>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
