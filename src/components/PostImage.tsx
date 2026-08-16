"use client";

import { useEffect, useState } from "react";

type PostImageProps = {
  imageUrl: string;
  alt: string;
};

export default function PostImage({ imageUrl, alt }: PostImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Görseli büyüt"
        className="bg-glow flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2 text-accent/70"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[9998] bg-black/80"
            onClick={() => setOpen(false)}
          />

          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-8"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-2xl object-contain"
            />
          </div>
        </>
      )}
    </>
  );
}
