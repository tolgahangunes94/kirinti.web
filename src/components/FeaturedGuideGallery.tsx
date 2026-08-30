"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FEATURED_GUIDES,
  FEATURED_GUIDE_CATEGORY_LABELS,
} from "./FeaturedGuideGallery.data";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

// Per-distance-from-active arc motion. Index 0 = active card, 1 = the
// immediate neighbor, 2 = anything two or more cards away. Desktop leans
// into the arc more; mobile keeps the same shape but flatter, since the
// narrow viewport already crops the ±2 cards down to a sliver.
const ARC_DESKTOP = {
  scale: [1.08, 0.82, 0.66],
  translateY: [0, 24, 45],
  rotate: [0, 4, 8],
  opacity: [1, 0.7, 0.38],
};
const ARC_MOBILE = {
  scale: [1.05, 0.85, 0.7],
  translateY: [0, 14, 30],
  rotate: [0, 3, 6],
  opacity: [1, 0.7, 0.4],
};

function getCardMotion(distance: number, side: -1 | 0 | 1, isDesktop: boolean) {
  const tier = distance === 0 ? 0 : distance === 1 ? 1 : 2;
  const arc = isDesktop ? ARC_DESKTOP : ARC_MOBILE;
  return {
    scale: arc.scale[tier],
    translateY: arc.translateY[tier],
    rotate: arc.rotate[tier] * side,
    opacity: arc.opacity[tier],
  };
}

export default function FeaturedGuideGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ratios = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(
            (entry.target as HTMLElement).dataset.guideIndex,
          );
          ratios.set(index, entry.intersectionRatio);
        }
        let bestIndex = 0;
        let bestRatio = -1;
        ratios.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });
        setActiveIndex((current) =>
          current === bestIndex ? current : bestIndex,
        );
      },
      {
        root: track,
        // Shrinks the observed area to a thin vertical band at the
        // horizontal center, so only the currently-centered card ever
        // registers a non-zero ratio (otherwise every card fits fully
        // inside the wide track and all report ratio 1, tying at index 0).
        rootMargin: "0px -42% 0px -42%",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const centerIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(FEATURED_GUIDES.length - 1, index));
      const el = itemRefs.current[clamped];
      if (!el) return;
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(clamped);
    },
    [prefersReducedMotion],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      centerIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      centerIndex(activeIndex - 1);
    }
  };

  const activeGuide = FEATURED_GUIDES[activeIndex];

  return (
    <section aria-labelledby="featured-guides-heading" className="mt-10">
      <h2
        id="featured-guides-heading"
        className="text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Öne Çıkan Rehberler
      </h2>

      <div className="relative mt-6">
        <style>{`.kw-featured-guide-track::-webkit-scrollbar{display:none}`}</style>
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Öne çıkan rehberler"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="kw-featured-guide-track flex h-[300px] items-center snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl px-[calc(50%-120px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-[380px] sm:px-[calc(50%-150px)]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FEATURED_GUIDES.map((guide, index) => {
            const distance = Math.abs(index - activeIndex);
            const side: -1 | 0 | 1 =
              index === activeIndex ? 0 : index < activeIndex ? -1 : 1;
            const { scale, translateY, rotate, opacity } = getCardMotion(
              distance,
              side,
              isDesktop,
            );
            const isActive = distance === 0;
            const isReady = Boolean(guide.href);
            const accessibleLabel = isReady
              ? `${guide.title} — Detaylı rehberi aç`
              : `${guide.title} — Detay rehberi hazırlanıyor`;

            const cardVisual = guide.image ? (
              <div className="relative h-full w-full">
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  fill
                  sizes="(min-width: 640px) 300px, 240px"
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            ) : (
              <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-2 via-surface to-background">
                <div className="bg-glow absolute inset-0" />
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    {guide.icon}
                  </svg>
                </span>
              </div>
            );

            return (
              <div
                key={guide.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-guide-index={index}
                className="motion-safe:transition-[transform,opacity] motion-safe:duration-300 h-[230px] w-[240px] shrink-0 snap-center sm:h-[280px] sm:w-[300px]"
                style={{
                  transform: `scale(${scale}) translateY(${translateY}px) rotateZ(${rotate}deg)`,
                  opacity,
                  zIndex: FEATURED_GUIDES.length - distance,
                }}
              >
                {isReady ? (
                  <Link
                    href={guide.href!}
                    aria-label={accessibleLabel}
                    className={`block h-full w-full overflow-hidden rounded-2xl border bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isActive
                        ? "border-accent/50 shadow-[0_0_28px_-8px_rgba(242,181,60,0.45)]"
                        : "border-border"
                    }`}
                  >
                    {cardVisual}
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-label={accessibleLabel}
                    onClick={() => centerIndex(index)}
                    className={`block h-full w-full overflow-hidden rounded-2xl border bg-surface-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isActive
                        ? "border-accent/50 shadow-[0_0_28px_-8px_rgba(242,181,60,0.45)]"
                        : "border-border"
                    }`}
                  >
                    {cardVisual}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => centerIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Önceki rehber"
          className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-30 sm:left-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4 6 10l6 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => centerIndex(activeIndex + 1)}
          disabled={activeIndex === FEATURED_GUIDES.length - 1}
          aria-label="Sonraki rehber"
          className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-foreground backdrop-blur transition-colors hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:pointer-events-none disabled:opacity-30 sm:right-2"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="mt-8 text-center" aria-live="polite">
        <span className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
          {FEATURED_GUIDE_CATEGORY_LABELS[activeGuide.category]}
        </span>
        <p className="text-balance mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {activeGuide.title}
        </p>
        {activeGuide.href ? (
          <Link
            href={activeGuide.href}
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-strong"
          >
            Detaylı rehberi aç
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
              <path d="M7 4l6 6-6 6" />
            </svg>
          </Link>
        ) : (
          <p className="mt-2 text-xs text-muted/70">Detay rehberi hazırlanıyor</p>
        )}
      </div>
    </section>
  );
}
