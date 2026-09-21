import Link from "next/link";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  return (
    <header className="relative border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="flex items-center"
          aria-label={`${site.name} — Inicio`}
        >
          <Logo className="h-12 w-auto sm:h-14" />
        </Link>

        <nav aria-label="Navegación principal" className="hidden sm:block">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
