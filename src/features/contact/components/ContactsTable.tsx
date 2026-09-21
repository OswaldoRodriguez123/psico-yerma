"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { createColumnHelper, type FilterFn } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { contactForm } from "@/content/site";
import type { ContactRow } from "@/features/contact/server/list-contacts";
import { buttonClass } from "@/components/styles";
import { CloseIcon, EyeIcon } from "@/components/ui/icons";

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santiago",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function reasonLabel(reason: string) {
  return (
    contactForm.reasons.find((item) => item.value === reason)?.label ?? reason
  );
}

const contactFilter: FilterFn<ContactRow> = (row, _columnId, filterValue) => {
  const term = String(filterValue).toLowerCase();
  const contact = row.original;

  return [
    contact.name,
    contact.email,
    contact.phone,
    contact.message,
    reasonLabel(contact.reason),
  ].some((value) => value?.toLowerCase().includes(term));
};

const columnHelper = createColumnHelper<ContactRow>();

export function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  const [selected, setSelected] = useState<ContactRow | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDetail = useCallback((contact: ContactRow) => {
    setSelected(contact);
    dialogRef.current?.showModal();
  }, []);

  const closeDetail = useCallback(() => {
    dialogRef.current?.close();
    setSelected(null);
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor("created_at", {
        header: "Fecha",
        cell: (info) => (
          <span className="whitespace-nowrap">{formatDate(info.getValue())}</span>
        ),
      }),
      columnHelper.accessor("name", {
        header: "Nombre",
        cell: (info) => (
          <span className="font-semibold text-ink">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor(
        (row) => [row.email, row.phone].filter(Boolean).join(" · "),
        {
          id: "contact",
          header: "Contacto",
        },
      ),
      columnHelper.accessor((row) => reasonLabel(row.reason), {
        id: "reason",
        header: "Motivo",
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="text-right">
            <button
              type="button"
              onClick={() => openDetail(row.original)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-primary hover:text-ink"
            >
              <EyeIcon className="h-4 w-4" />
              Ver
            </button>
          </div>
        ),
      }),
    ],
    [openDetail],
  );

  return (
    <>
      <DataTable
        data={contacts}
        columns={columns}
        globalFilterFn={contactFilter}
        initialSorting={[{ id: "created_at", desc: true }]}
        searchPlaceholder="Buscar por nombre, contacto o mensaje…"
        emptyMessage="No se encontraron contactos."
      />

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        className="m-auto max-h-[85vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 text-ink"
      >
        {selected ? (
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-bold text-ink">{selected.name}</h2>
              <button
                type="button"
                onClick={closeDetail}
                aria-label="Cerrar"
                className="cursor-pointer text-ink-soft transition-colors hover:text-ink"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold text-ink-soft">Fecha</dt>
                <dd>{formatDate(selected.created_at)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink-soft">Motivo</dt>
                <dd>{reasonLabel(selected.reason)}</dd>
              </div>
              {selected.email ? (
                <div>
                  <dt className="font-semibold text-ink-soft">Correo</dt>
                  <dd>{selected.email}</dd>
                </div>
              ) : null}
              {selected.phone ? (
                <div>
                  <dt className="font-semibold text-ink-soft">Teléfono</dt>
                  <dd>{selected.phone}</dd>
                </div>
              ) : null}
              <div>
                <dt className="font-semibold text-ink-soft">Mensaje</dt>
                <dd className="whitespace-pre-wrap">{selected.message}</dd>
              </div>
            </dl>

            <div className="mt-5 flex flex-wrap gap-3">
              {selected.email ? (
                <a href={`mailto:${selected.email}`} className={buttonClass}>
                  Responder por correo
                </a>
              ) : null}
              {selected.phone ? (
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClass}
                >
                  Escribir por WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
