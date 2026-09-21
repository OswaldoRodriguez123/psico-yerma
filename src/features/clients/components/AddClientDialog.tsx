"use client";

import { useCallback, useRef } from "react";
import { ClientForm } from "@/features/clients/components/ClientForm";
import { buttonClass } from "@/components/styles";
import { CloseIcon } from "@/components/ui/icons";

export function AddClientDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  return (
    <>
      <button type="button" onClick={openDialog} className={buttonClass}>
        Añadir cliente
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-ink"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-ink">Añadir cliente</h2>
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Cerrar"
            className="cursor-pointer text-ink-soft transition-colors hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5">
          <ClientForm onSuccess={closeDialog} />
        </div>
      </dialog>
    </>
  );
}
