import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import GuideBoard from "@/components/GuideBoard";
import FeaturedGuideGallery from "@/components/FeaturedGuideGallery";

export const metadata: Metadata = {
  title: "Saha Rehberi — Derede ve Kuvarsta Altın Arama Teknikleri",
  description:
    "Jeolojiden dere okumaya, kuvars damarı belirlemeden doğru panlama tekniğine kadar sahada işine yarayacak temel bilgiler.",
  alternates: {
    canonical: "/rehber",
  },
};

export default function RehberPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Saha Rehberi
        </h1>
        <p className="mt-2 text-sm text-muted">
          Jeolojiden dere okumaya, doğru panlama tekniğine kadar sahada işine
          yarayacak temel bilgiler.
        </p>

        <Link
          href="/rehber/derede-altin-nasil-bulunur"
          className="motion-safe:transition-colors mt-6 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-6 hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
              Kapsamlı Rehber
            </span>
            <h2 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
              Derede Altın Nasıl Bulunur?
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              Başlangıçtan saha okumaya, aşağıdaki tüm rehberleri birbirine
              bağlayan tam kılavuz.
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
            Rehberi Aç
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M7 4l6 6-6 6" />
            </svg>
          </span>
        </Link>

        <FeaturedGuideGallery />

        <h2 className="text-balance mt-16 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Tüm Rehberler
        </h2>
        <div className="mt-6">
          <GuideBoard />
        </div>
      </main>
    </>
  );
}
