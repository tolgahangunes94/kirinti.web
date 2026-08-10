export default function CommunityCta() {
  return (
    <section id="topluluk" className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="bg-glow mx-auto flex max-w-6xl flex-col items-center rounded-3xl border border-border bg-surface px-6 py-14 text-center sm:px-12 sm:py-20">
        <h2 className="text-balance max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Topluluğa katıl, kırıntıları birlikte biriktirelim
        </h2>
        <p className="text-balance mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Üyelik tamamen ücretsiz. Hemen katıl, sahadan gelen bilgiye ilk elden
          ulaş.
        </p>
        <a
          href="mailto:info@kirintimadencilik.com"
          className="mt-8 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-strong"
        >
          Hemen Üye Ol
        </a>
      </div>
    </section>
  );
}
