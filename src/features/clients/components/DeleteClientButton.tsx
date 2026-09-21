"use client";

import { useState, useTransition } from "react";
import { deleteClientAction } from "@/features/clients/actions";
import { useToast } from "@/components/ui/Toast";
import { buttonClass, dangerButtonClass } from "@/components/styles";

export function DeleteClientButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={dangerButtonClass}
      >
        Eliminar
      </button>
    );
  }

  return (
    <span className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-ink-soft">¿Eliminar este cliente?</span>
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const result = await deleteClientAction(id);
            showToast(
              result.ok
                ? "Cliente eliminado."
                : "No se pudo eliminar el cliente.",
              result.ok ? "success" : "error",
            );
          })
        }
        className={dangerButtonClass}
      >
        {isPending ? "Eliminando…" : "Sí, eliminar"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className={buttonClass}
      >
        Cancelar
      </button>
    </span>
  );
}
