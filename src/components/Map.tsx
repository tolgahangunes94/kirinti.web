"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeologicalZone } from "@/types/geological";
import type { Discovery } from "@/lib/supabase/discoveries";
import PostImage from "@/components/PostImage";

const IZMIR_CENTER: [number, number] = [38.42, 27.14];
const DEFAULT_ZOOM = 9;
const MY_DISCOVERIES_FILTER = "my_discoveries" as const;

type ZoneFilter = "all" | GeologicalZone["zone_type"];
type MapFilter = ZoneFilter | typeof MY_DISCOVERIES_FILTER;

const ZONE_FILTERS: { label: string; value: ZoneFilter }[] = [
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

function LockIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
      <path d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
    </svg>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type MapProps = {
  zones: GeologicalZone[];
  myDiscoveries?: Discovery[];
  isAuthenticated?: boolean;
};

export default function Map({
  zones,
  myDiscoveries = [],
  isAuthenticated = false,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const [filter, setFilter] = useState<MapFilter>("all");
  const [selectedZone, setSelectedZone] = useState<GeologicalZone | null>(
    null,
  );
  const [selectedDiscovery, setSelectedDiscovery] = useState<Discovery | null>(
    null,
  );

  const filterOptions: { label: string; value: MapFilter }[] = isAuthenticated
    ? [...ZONE_FILTERS, { label: "🔒 Benim Keşiflerim", value: MY_DISCOVERIES_FILTER }]
    : ZONE_FILTERS;

  const filteredZones = useMemo(
    () =>
      filter === "all"
        ? zones
        : filter === MY_DISCOVERIES_FILTER
          ? []
          : zones.filter((zone) => zone.zone_type === filter),
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

      if (filter === MY_DISCOVERIES_FILTER) {
        myDiscoveries.forEach((discovery) => {
          if (discovery.latitude == null || discovery.longitude == null) return;

          const icon = L.divIcon({
            className: "",
            html: `<span style="display:block;width:16px;height:16px;transform:rotate(45deg);background:#eab308;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.45);"></span>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });

          const marker = L.marker([discovery.latitude, discovery.longitude], {
            icon,
          }).addTo(map);
          marker.on("click", () => setSelectedDiscovery(discovery));
          markersRef.current.push(marker);
        });
        return;
      }

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
  }, [filteredZones, filter, myDiscoveries]);

  return (
    <div>
      <div className="-mx-1 flex flex-wrap gap-2 px-1">
        {filterOptions.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => {
              setFilter(item.value);
              setSelectedZone(null);
              setSelectedDiscovery(null);
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

      {filter === MY_DISCOVERIES_FILTER && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent">
          <LockIcon />
          Bu katman yalnızca sana görünür.
        </p>
      )}

      <div className="relative mt-4 h-[600px] w-full overflow-hidden rounded-2xl border border-border">
        <div ref={mapContainerRef} className="h-full w-full" />

        {selectedDiscovery && (
          <div className="absolute inset-x-4 bottom-4 z-[1000] max-h-[calc(100%-2rem)] overflow-y-auto rounded-2xl border border-border bg-surface p-5 shadow-lg sm:inset-x-auto sm:left-4 sm:w-80">
            <button
              type="button"
              onClick={() => setSelectedDiscovery(null)}
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

            <div className="flex items-center gap-1.5 pr-6 text-xs font-medium text-accent">
              <LockIcon />
              {selectedDiscovery.city} / {selectedDiscovery.district}
            </div>

            {(selectedDiscovery.village_or_area ||
              selectedDiscovery.stream_or_site_name ||
              selectedDiscovery.rock_type) && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedDiscovery.village_or_area && (
                  <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
                    Köy/Mevki: {selectedDiscovery.village_or_area}
                  </span>
                )}
                {selectedDiscovery.stream_or_site_name && (
                  <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
                    Dere/Saha: {selectedDiscovery.stream_or_site_name}
                  </span>
                )}
                {selectedDiscovery.rock_type && (
                  <span className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-foreground">
                    Kayaç: {selectedDiscovery.rock_type}
                  </span>
                )}
              </div>
            )}

            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
              {selectedDiscovery.field_notes}
            </p>

            {selectedDiscovery.images.length > 0 && (
              <div className="mt-3 flex gap-2">
                {selectedDiscovery.images.map(
                  (image) =>
                    image.url && (
                      <PostImage
                        key={image.id}
                        imageUrl={image.url}
                        alt={`${selectedDiscovery.city} / ${selectedDiscovery.district}`}
                      />
                    ),
                )}
              </div>
            )}

            <p className="mt-3 text-xs text-muted">
              {formatDate(selectedDiscovery.created_at)}
            </p>
          </div>
        )}

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
