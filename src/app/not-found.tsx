import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/styles";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-widest text-ink-soft uppercase">
        Error 404
      </p>
      <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
        Esta página no existe
      </h1>
      <p className="mt-4 text-lg text-ink-soft">
        Puede que el enlace esté mal escrito o que la página haya cambiado de
        lugar.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass}>
          Volver al inicio
        </Link>
        <Link href="/contacto" className={buttonClass}>
          Ir a contacto
        </Link>
      </div>
    </main>
  );
}
