import Link from "next/link";

const LINKS = [
  { href: "/harita", label: "Harita" },
  { href: "/rehber", label: "Saha Rehberi" },
  { href: "/kesifler", label: "Keşiflerim" },
  { href: "/", label: "Topluluk" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
              K
            </span>
            <span className="text-base font-semibold tracking-tight">
              KırıntıMadencilik.com
            </span>
          </div>
          <p className="max-w-xs text-center text-sm text-muted sm:text-left">
            Türkiye&apos;nin kaynaklı jeoloji, saha günlüğü ve kırıntı
            madenciliği topluluk platformu.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
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
        © {new Date().getFullYear()} KırıntıMadencilik.com. Tüm hakları
        saklıdır.
      </p>
    </footer>
  );
}
