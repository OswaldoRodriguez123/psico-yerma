"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { buttonClass } from "@/components/styles";
import { CloseIcon, EyeIcon } from "@/components/ui/icons";

export function DetailDialog({
  title,
  children,
  actions,
  triggerLabel = "Ver",
  editContent,
}: {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  triggerLabel?: string;
  editContent?: (controls: {
    onSaved: () => void;
    onCancel: () => void;
  }) => ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState(false);

  const exitEdit = useCallback(() => setEditing(false), []);

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
        onClose={() => setEditing(false)}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-left text-ink"
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

        <div className="mt-4">
          {editing && editContent
            ? editContent({ onSaved: exitEdit, onCancel: exitEdit })
            : children}
        </div>

        {!editing ? (
          <div className="mt-5 flex flex-wrap gap-3">
            {actions}
            {editContent ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className={buttonClass}
              >
                Editar
              </button>
            ) : null}
          </div>
        ) : null}
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
