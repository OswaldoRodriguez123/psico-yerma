"use client";

import { useState } from "react";
import Link from "next/link";
import { nav } from "@/content/site";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-primary-soft"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Navegación principal"
          className="absolute inset-x-0 top-full z-50 border-t border-border bg-surface shadow-sm"
        >
          <ul className="mx-auto max-w-5xl space-y-1 px-6 py-4 text-base font-semibold">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-ink-soft transition-colors hover:bg-primary-soft hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
