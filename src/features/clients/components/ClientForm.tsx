"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createClientAction,
  type ClientFormState,
} from "@/features/clients/actions";
import { ClientFields } from "@/features/clients/components/ClientFields";
import { useToast } from "@/components/ui/Toast";
import { buttonClass } from "@/components/styles";

export function ClientForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, isPending] = useActionState<
    ClientFormState,
    FormData
  >(createClientAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      showToast("Cliente agregado.");
      onSuccess?.();
    }
  }, [state, onSuccess, showToast]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <ClientFields errors={state?.fieldErrors ?? {}} />

      {state?.error ? (
        <p className="rounded-xl bg-danger-soft px-4 py-3 font-semibold text-danger">
          {state.error}
        </p>
      ) : null}

      <button type="submit" disabled={isPending} className={buttonClass}>
        {isPending ? "Guardando…" : "Guardar cliente"}
      </button>
    </form>
  );
}
