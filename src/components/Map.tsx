"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Map as LeafletMap,
  Marker as LeafletMarker,
  TileLayer as LeafletTileLayer,
} from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeologicalZone } from "@/types/geological";
import type { Discovery } from "@/lib/supabase/discoveries";
import PostImage from "@/components/PostImage";

const IZMIR_CENTER: [number, number] = [38.42, 27.14];
const DEFAULT_ZOOM = 9;
const MY_DISCOVERIES_FILTER = "my_discoveries" as const;

type BaseLayer = "standard" | "satellite";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;
const SATELLITE_AVAILABLE = Boolean(MAPTILER_KEY);

const STANDARD_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const STANDARD_ATTRIBUTION = "&copy; OpenStreetMap katkıda bulunanlar";

const SATELLITE_TILE_URL = `https://api.maptiler.com/maps/satellite-v4/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`;
const SATELLITE_ATTRIBUTION =
  '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank" rel="noreferrer">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap katkıda bulunanlar</a>';

const BASE_LAYER_OPTIONS: { label: string; value: BaseLayer }[] = [
  { label: "Standart", value: "standard" },
  { label: "Uydu", value: "satellite" },
];

function addBaseLayer(
  L: typeof import("leaflet"),
  map: LeafletMap,
  base: BaseLayer,
): LeafletTileLayer {
  if (base === "satellite" && SATELLITE_AVAILABLE) {
    return L.tileLayer(SATELLITE_TILE_URL, {
      attribution: SATELLITE_ATTRIBUTION,
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      maxZoom: 20,
      crossOrigin: true,
    }).addTo(map);
  }

  return L.tileLayer(STANDARD_TILE_URL, {
    attribution: STANDARD_ATTRIBUTION,
  }).addTo(map);
}

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

function CloseIcon() {
  return (
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
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildDiscoveryMarkerHtml(selected: boolean) {
  const fill = selected ? "#fbbf24" : "#eab308";
  const stroke = selected ? "#fffbeb" : "#fff8e1";
  const strokeWidth = selected ? 1.8 : 1.3;
  const glow = selected
    ? "drop-shadow(0 0 5px rgba(251,191,36,0.9)) drop-shadow(0 0 13px rgba(251,191,36,0.55)) drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
    : "drop-shadow(0 2px 4px rgba(0,0,0,0.45))";

  return `<svg width="22" height="28" viewBox="0 0 22 28" xmlns="http://www.w3.org/2000/svg" style="filter:${glow}">
    <path d="M11 27C11 27 20 16.8 20 10.5C20 5.26 16.02 1 11 1C5.98 1 2 5.26 2 10.5C2 16.8 11 27 11 27Z" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}"/>
    <circle cx="11" cy="10.6" r="6" fill="#0B0F17"/>
    <rect x="7.7" y="10.3" width="6.6" height="5.1" rx="1.1" fill="${fill}"/>
    <path d="M9 10.3V8.7a2 2 0 0 1 4 0v1.6" stroke="${fill}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  </svg>`;
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
  const baseLayerRef = useRef<LeafletTileLayer | null>(null);
  const [baseLayer, setBaseLayer] = useState<BaseLayer>("standard");
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

      baseLayerRef.current = addBaseLayer(L, map, "standard");
      mapRef.current = map;
    }

    initMap();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      baseLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    async function syncBaseLayer() {
      const map = mapRef.current;
      if (!map) return;

      const { default: L } = await import("leaflet");

      if (baseLayerRef.current) {
        map.removeLayer(baseLayerRef.current);
      }

      baseLayerRef.current = addBaseLayer(L, map, baseLayer);
    }

    syncBaseLayer();
  }, [baseLayer]);

  useEffect(() => {
    async function updateMarkers() {
      const map = mapRef.current;
      if (!map) return;

      const { default: L } = await import("leaflet");

      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      const showDiscoveries =
        filter === MY_DISCOVERIES_FILTER || filter === "all";
      const showZones = filter !== MY_DISCOVERIES_FILTER;

      if (showDiscoveries) {
        myDiscoveries.forEach((discovery) => {
          if (discovery.latitude == null || discovery.longitude == null) return;

          const isSelected = selectedDiscovery?.id === discovery.id;
          const icon = L.divIcon({
            className: "",
            html: buildDiscoveryMarkerHtml(isSelected),
            iconSize: [22, 28],
            iconAnchor: [11, 28],
          });

          const marker = L.marker([discovery.latitude, discovery.longitude], {
            icon,
          }).addTo(map);
          if (isSelected) marker.setZIndexOffset(1000);
          marker.on("click", () => setSelectedDiscovery(discovery));
          markersRef.current.push(marker);
        });
      }

      if (showZones) {
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
    }

    updateMarkers();
  }, [filteredZones, filter, myDiscoveries, selectedDiscovery]);

  return (
    <div>
      <div className="-mx-1 flex flex-wrap gap-2 px-1">
        {filterOptions.map((item) => {
          const isActive = filter === item.value;
          const isPrivateFilter = item.value === MY_DISCOVERIES_FILTER;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setFilter(item.value);
                setSelectedZone(null);
                setSelectedDiscovery(null);
              }}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? isPrivateFilter
                    ? "bg-accent text-accent-foreground shadow-[0_0_0_3px_rgba(234,179,8,0.28)]"
                    : "bg-accent text-accent-foreground"
                  : "border border-border bg-surface-2 text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {filter === MY_DISCOVERIES_FILTER && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
          <LockIcon />
          Bu katman yalnızca sana görünür.
        </div>
      )}

      <div className="relative mt-4 h-[600px] w-full overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/30">
        <div ref={mapContainerRef} className="h-full w-full" />

        <div className="absolute right-3 top-3 z-[900] flex items-center gap-1 rounded-xl border border-border bg-surface/95 p-1 shadow-lg backdrop-blur-sm">
          {BASE_LAYER_OPTIONS.map((option) => {
            const isActive = baseLayer === option.value;
            const isDisabled =
              option.value === "satellite" && !SATELLITE_AVAILABLE;

            return (
              <button
                key={option.value}
                type="button"
                disabled={isDisabled}
                title={
                  isDisabled
                    ? "Uydu görünümü için MapTiler API anahtarı gerekli"
                    : undefined
                }
                onClick={() => setBaseLayer(option.value)}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : isDisabled
                      ? "cursor-not-allowed text-muted/40"
                      : "text-muted hover:text-foreground"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 z-[900] rounded-xl border border-border bg-surface/95 px-3.5 py-3 text-[11px] shadow-lg backdrop-blur-sm">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">
            Lejant
          </p>
          <div className="flex flex-col gap-1.5">
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-[3px] bg-accent" />
                <span className="text-foreground">🔒 Benim Keşiflerim</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: ZONE_COLORS.quartz_vein }}
              />
              <span className="text-foreground">Kuvars Damarları</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: ZONE_COLORS.geothermal }}
              />
              <span className="text-foreground">Jeotermal Hatlar</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ background: ZONE_COLORS.mineral_deposit }}
              />
              <span className="text-foreground">Maden Sahaları</span>
            </div>
          </div>
        </div>

        {selectedDiscovery && (
          <div className="absolute inset-x-4 bottom-4 z-[1000] flex max-h-[70%] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/40 sm:inset-x-auto sm:inset-y-4 sm:left-auto sm:right-4 sm:w-80 sm:max-h-none">
            <div className="h-1 w-full shrink-0 bg-gradient-to-r from-accent/70 via-accent to-accent/70" />

            <div className="flex items-start justify-between gap-3 border-b border-border px-5 pb-4 pt-4">
              <h3 className="text-sm font-semibold text-accent">
                🔒 Benim Keşfim
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDiscovery(null)}
                aria-label="Kapat"
                className="shrink-0 text-muted transition-colors hover:text-foreground"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-2.5 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="shrink-0 text-xs text-muted">
                    İl / İlçe
                  </span>
                  <span className="text-right font-medium text-foreground">
                    {selectedDiscovery.city} / {selectedDiscovery.district}
                  </span>
                </div>

                {selectedDiscovery.village_or_area && (
                  <div className="flex items-start justify-between gap-3">
                    <span className="shrink-0 text-xs text-muted">
                      Köy / Mevki
                    </span>
                    <span className="text-right font-medium text-foreground">
                      {selectedDiscovery.village_or_area}
                    </span>
                  </div>
                )}

                {selectedDiscovery.stream_or_site_name && (
                  <div className="flex items-start justify-between gap-3">
                    <span className="shrink-0 text-xs text-muted">
                      Dere / Saha
                    </span>
                    <span className="text-right font-medium text-foreground">
                      {selectedDiscovery.stream_or_site_name}
                    </span>
                  </div>
                )}

                {selectedDiscovery.rock_type && (
                  <div className="flex items-start justify-between gap-3">
                    <span className="shrink-0 text-xs text-muted">
                      Kayaç Türü
                    </span>
                    <span className="text-right font-medium text-foreground">
                      {selectedDiscovery.rock_type}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs font-medium text-muted">Saha Notu</p>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-foreground">
                  {selectedDiscovery.field_notes}
                </p>
              </div>

              {selectedDiscovery.images.length > 0 && (
                <div className="mt-4 flex gap-2">
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

              <p className="mt-4 text-xs text-muted">
                {formatDate(selectedDiscovery.created_at)}
              </p>
            </div>
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
              <CloseIcon />
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
