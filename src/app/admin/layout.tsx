import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/contactos", label: "Contactos" },
  { href: "/admin/clientes", label: "Clientes" },
];

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ToastProvider>
      <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <nav aria-label="Navegación del panel">
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

          <form action={signOut}>
            <button
              type="submit"
              className="cursor-pointer text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              Salir
            </button>
          </form>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">
        {children}
      </main>
      </div>
    </ToastProvider>
  );
}
