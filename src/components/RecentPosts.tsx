import type { Post } from "@/lib/supabase/posts";
import PostCard from "@/components/PostCard";

const FILTER_TABS = [
  "Popüler",
  "Yeni",
  "Takip Edilen",
  "Sorular",
  "Keşif Paylaşımları",
];

const NEWS = [
  {
    title: "Türkiye'de yeni altın rezervi keşfi",
    meta: "Ekonomi • 2 saat önce",
  },
  {
    title: "Altın fiyatlarında son durum",
    meta: "Piyasa • 5 saat önce",
  },
  {
    title: "Dünyanın en büyük altın üreticileri",
    meta: "Sektör • 1 gün önce",
  },
  {
    title: "Altın arama teknolojilerinde yeni gelişmeler",
    meta: "Teknoloji • 2 gün önce",
  },
];

function PlayIcon({ small }: { small?: boolean }) {
  const size = small ? 16 : 20;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      stroke="none"
    >
      <path d="M6 4.5 15.5 10 6 15.5v-11Z" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
      <path d="M5.5 7.5h6M5.5 10.5h6M5.5 13h4" />
    </svg>
  );
}

type RecentPostsProps = {
  posts: Post[];
};

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="border-t border-border px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Sol Taraf: Son Gönderiler */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Son Gönderiler
            </h2>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {FILTER_TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                    i === 0
                      ? "bg-accent text-accent-foreground"
                      : "border border-border bg-surface-2 text-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {posts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border bg-surface-2 px-6 py-10 text-center">
                <p className="text-sm text-muted">
                  Henüz paylaşılan bir keşif yok. İlk paylaşımı sen yap!
                </p>
              </div>
            )}

            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Sağ Taraf: Madencilik Haberleri + Videolar */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Madencilik Haberleri
            </h2>
            <a
              href="#"
              className="shrink-0 text-xs font-medium text-accent transition-colors hover:text-accent-strong"
            >
              Tüm Haberler &rarr;
            </a>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {NEWS.map((item) => (
              <a
                key={item.title}
                href="#"
                className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-accent/40"
              >
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-accent/70">
                  <NewsIcon />
                </span>
                <div className="min-w-0 py-0.5">
                  <h3 className="text-sm font-semibold leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted">{item.meta}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Videolar &amp; Vloglar
              </h2>
              <a
                href="#"
                className="shrink-0 text-xs font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Tüm Videolar &rarr;
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="#"
                className="group relative flex aspect-video items-end overflow-hidden rounded-2xl border border-border bg-surface-2"
              >
                <div className="bg-glow absolute inset-0" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-105">
                    <PlayIcon />
                  </span>
                </span>
                <div className="relative z-10 flex w-full items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <span className="truncate text-xs font-semibold text-white">
                    SART ÇAYI&apos;NDA ALTIN ARADIK!
                  </span>
                  <span className="shrink-0 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                    8:24
                  </span>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-accent/40"
              >
                <span className="relative flex h-14 w-20 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-accent/70">
                  <PlayIcon small />
                </span>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                    Panda ile Altın Ayırma Uygulamalı Anlatım
                  </h3>
                  <p className="mt-1 text-xs text-muted">6:15</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
