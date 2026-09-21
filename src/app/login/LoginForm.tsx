"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/lib/auth";
import { buttonClass } from "@/components/styles";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<SignInState, FormData>(
    signIn,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="email" className="block font-semibold text-ink">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-semibold text-ink">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary"
        />
      </div>

      {state?.error ? (
        <p className="text-sm font-semibold text-danger">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className={`w-full ${buttonClass} disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {isPending ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
