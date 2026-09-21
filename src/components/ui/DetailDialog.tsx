"use client";

import { useRef, type ReactNode } from "react";
import { CloseIcon, EyeIcon } from "@/components/ui/icons";

export function DetailDialog({
  title,
  children,
  actions,
  triggerLabel = "Ver",
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  triggerLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-primary hover:text-ink"
      >
        <EyeIcon className="h-4 w-4" />
        {triggerLabel}
      </button>

      <dialog
        ref={dialogRef}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-ink"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-lg font-bold text-ink">{title}</h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Cerrar"
            className="cursor-pointer text-ink-soft transition-colors hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">{children}</div>

        {actions ? <div className="mt-5 flex flex-wrap gap-3">{actions}</div> : null}
      </dialog>
    </>
  );
}

export function DetailItem({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="font-semibold text-ink-soft">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
