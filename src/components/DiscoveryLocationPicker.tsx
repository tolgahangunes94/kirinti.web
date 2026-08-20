"use client";

import { useState } from "react";
import DiscoveryLocationPickerModal from "@/components/DiscoveryLocationPickerModal";

export type DiscoveryPoint = {
  latitude: number;
  longitude: number;
};

type DiscoveryLocationPickerProps = {
  onChange?: (point: DiscoveryPoint | null) => void;
};

function PinIcon() {
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

export default function DiscoveryLocationPicker({
  onChange,
}: DiscoveryLocationPickerProps) {
  const [point, setPoint] = useState<DiscoveryPoint | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  function handleConfirm(nextPoint: DiscoveryPoint) {
    setPoint(nextPoint);
    setPickerOpen(false);
    onChange?.(nextPoint);
  }

  function handleRemove() {
    setPoint(null);
    onChange?.(null);
  }

  return (
    <div>
      {point ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-lg border border-border bg-surface-2 px-3.5 py-2.5">
          <span className="flex items-center gap-1.5 text-xs text-foreground">
            <PinIcon />
            {point.latitude.toFixed(5)}, {point.longitude.toFixed(5)}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-xs font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Değiştir
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="text-xs font-medium text-muted transition-colors hover:text-red-400"
            >
              Kaldır
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border bg-surface-2 px-3.5 py-2.5 text-xs font-medium text-muted transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <PinIcon />
          Nokta Seç
        </button>
      )}

      <DiscoveryLocationPickerModal
        open={pickerOpen}
        initialPoint={point}
        onConfirm={handleConfirm}
        onClose={() => setPickerOpen(false)}
      />
    </div>
  );
}
