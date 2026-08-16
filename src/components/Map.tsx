"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeologicalZone } from "@/types/geological";

const IZMIR_CENTER: [number, number] = [38.42, 27.14];
const DEFAULT_ZOOM = 9;

type ZoneFilter = "all" | GeologicalZone["zone_type"];

const FILTERS: { label: string; value: ZoneFilter }[] = [
  { label: "Tümü", value: "all" },
  { label: "Kuvars Damarları", value: "quartz_vein" },
  { label: "Jeotermal Hatlar", value: "geothermal" },
  { label: "Maden Sahaları", value: "mineral_deposit" },
];

const ZONE_COLORS: Record<string, string> = {
  geothermal: "#f97316",
  quartz_vein: "#eab308",
  mineral_deposit: "#3b82f6",
};

const DEFAULT_ZONE_COLOR = "#9ca3af";

type MapProps = {
  zones: GeologicalZone[];
};

export default function Map({ zones }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const [filter, setFilter] = useState<ZoneFilter>("all");
  const [selectedZone, setSelectedZone] = useState<GeologicalZone | null>(
    null,
  );

  const filteredZones = useMemo(
    () =>
      filter === "all" ? zones : zones.filter((zone) => zone.zone_type === filter),
    [zones, filter],
  );

  useEffect(() => {
    let cancelled = false;

    async function initMap() {
      const { default: L } = await import("leaflet");
      if (cancelled || !mapContainerRef.current || mapRef.current) return;

      const map = L.map(mapContainerRef.current).setView(
        IZMIR_CENTER,
        DEFAULT_ZOOM,
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap katkıda bulunanlar",
      }).addTo(map);

      mapRef.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function updateMarkers() {
      const map = mapRef.current;
      if (!map) return;

      const { default: L } = await import("leaflet");

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      filteredZones.forEach((zone) => {
        const color = ZONE_COLORS[zone.zone_type] ?? DEFAULT_ZONE_COLOR;
        const icon = L.divIcon({
          className: "",
          html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.45);"></span>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const marker = L.marker([zone.latitude, zone.longitude], {
          icon,
        }).addTo(map);
        marker.on("click", () => setSelectedZone(zone));
        markersRef.current.push(marker);
      });
    }

    updateMarkers();
  }, [filteredZones]);

  return (
    <div>
      <div className="-mx-1 flex flex-wrap gap-2 px-1">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => {
              setFilter(item.value);
              setSelectedZone(null);
            }}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === item.value
                ? "bg-accent text-accent-foreground"
                : "border border-border bg-surface-2 text-muted hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mt-4 h-[600px] w-full overflow-hidden rounded-2xl border border-border">
        <div ref={mapContainerRef} className="h-full w-full" />

        {selectedZone && (
          <div className="absolute inset-x-4 bottom-4 z-[1000] rounded-2xl border border-border bg-surface p-5 shadow-lg sm:inset-x-auto sm:left-4 sm:w-80">
            <button
              type="button"
              onClick={() => setSelectedZone(null)}
              aria-label="Kapat"
              className="absolute right-3 top-3 text-muted transition-colors hover:text-foreground"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              >
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>

            <h3 className="pr-6 text-base font-semibold text-foreground">
              {selectedZone.title}
            </h3>

            {(selectedZone.city || selectedZone.region) && (
              <p className="mt-1 text-xs font-medium text-accent">
                {[selectedZone.city, selectedZone.region]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
            )}

            {selectedZone.potential_level && (
              <span className="mt-2 inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent">
                Potansiyel: {selectedZone.potential_level}
              </span>
            )}

            {selectedZone.description && (
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                {selectedZone.description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
