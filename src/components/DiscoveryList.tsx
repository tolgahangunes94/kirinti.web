"use client";

import { useMemo, useState } from "react";
import type { Discovery } from "@/lib/supabase/discoveries";
import DiscoveryCard from "@/components/DiscoveryCard";

const ALL = "__all__";

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  if (options.length === 0) return null;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="rounded-full border border-border bg-surface-2 px-3.5 py-1.5 text-xs text-foreground outline-none transition-colors focus:border-accent"
    >
      <option value={ALL}>{label}: Tümü</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

type DiscoveryListProps = {
  discoveries: Discovery[];
};

export default function DiscoveryList({ discoveries }: DiscoveryListProps) {
  const [city, setCity] = useState(ALL);
  const [district, setDistrict] = useState(ALL);
  const [rockType, setRockType] = useState(ALL);

  const cities = useMemo(
    () => Array.from(new Set(discoveries.map((d) => d.city))).sort(),
    [discoveries],
  );
  const districts = useMemo(
    () => Array.from(new Set(discoveries.map((d) => d.district))).sort(),
    [discoveries],
  );
  const rockTypes = useMemo(
    () =>
      Array.from(
        new Set(
          discoveries
            .map((d) => d.rock_type)
            .filter((value): value is string => Boolean(value)),
        ),
      ).sort(),
    [discoveries],
  );

  const filtered = discoveries.filter((discovery) => {
    if (city !== ALL && discovery.city !== city) return false;
    if (district !== ALL && discovery.district !== district) return false;
    if (rockType !== ALL && discovery.rock_type !== rockType) return false;
    return true;
  });

  return (
    <div>
      {discoveries.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <FilterSelect label="İl" value={city} onChange={setCity} options={cities} />
          <FilterSelect
            label="İlçe"
            value={district}
            onChange={setDistrict}
            options={districts}
          />
          <FilterSelect
            label="Kayaç Türü"
            value={rockType}
            onChange={setRockType}
            options={rockTypes}
          />
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {discoveries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
            <p className="text-sm text-muted">
              Henüz keşif kaydı yok. İlk kaydı sen oluştur!
            </p>
          </div>
        )}

        {discoveries.length > 0 && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
            <p className="text-sm text-muted">
              Bu filtrelerle eşleşen kayıt yok.
            </p>
          </div>
        )}

        {filtered.map((discovery) => (
          <DiscoveryCard key={discovery.id} discovery={discovery} />
        ))}
      </div>
    </div>
  );
}
