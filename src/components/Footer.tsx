const LINKS = [
  { href: "#hakkinda", label: "Hakkımızda" },
  { href: "#ozellikler", label: "Özellikler" },
  { href: "#topluluk", label: "Topluluk" },
];

export default function Footer() {
  return (
    <footer id="iletisim" className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
              K
            </span>
            <span className="text-base font-semibold tracking-tight">
              Kırıntı Madencilik
            </span>
          </div>
          <p className="max-w-xs text-center text-sm text-muted sm:text-left">
            Madenciler için modern topluluk platformu.
          </p>
        </div>

        <nav className="flex gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:info@kirintimadencilik.com"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          info@kirintimadencilik.com
        </a>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Kırıntı Madencilik. Tüm hakları saklıdır.
      </p>
    </footer>
  );
}
