import type { Metadata } from "next";
import { site } from "@/content/site";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Acceso",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-6">
        <h1 className="text-xl font-bold text-ink">Acceso privado</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Área de {site.professionalName}.
        </p>
        <div className="mt-5">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
