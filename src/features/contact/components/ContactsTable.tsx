"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { contactForm } from "@/content/site";
import type { ContactRow } from "@/features/contact/server/list-contacts";
import { buttonClass } from "@/components/styles";
import { CloseIcon } from "@/components/ui/icons";

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

const columnHelper = createColumnHelper<ContactRow>();

export function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  const [selected, setSelected] = useState<ContactRow | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
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
              className="cursor-pointer font-semibold text-ink-soft transition-colors hover:text-ink"
            >
              Ver
            </button>
          </div>
        ),
      }),
    ],
    [openDetail],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table no es compatible con React Compiler
  const table = useReactTable({
    data: contacts,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, filterValue) => {
      const term = String(filterValue).toLowerCase();
      const contact = row.original;

      return [
        contact.name,
        contact.email,
        contact.phone,
        contact.message,
        reasonLabel(contact.reason),
      ].some((value) => value?.toLowerCase().includes(term));
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [{ id: "created_at", desc: true }],
      pagination: { pageSize: 10 },
    },
  });

  const rows = table.getRowModel().rows;
  const sortIndicator = { asc: " ↑", desc: " ↓" } as const;

  return (
    <div>
      <input
        type="search"
        value={globalFilter}
        onChange={(event) => setGlobalFilter(event.target.value)}
        placeholder="Buscar por nombre, contacto o mensaje…"
        aria-label="Buscar contactos"
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary"
      />

      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-primary-soft text-ink">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {sortIndicator[
                          header.column.getIsSorted() as keyof typeof sortIndicator
                        ] ?? ""}
                      </button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr className="border-t border-border">
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-ink-soft"
                >
                  No se encontraron contactos.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 text-ink-soft">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {table.getPageCount() > 1 ? (
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-ink-soft">
          <span>
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="cursor-pointer rounded-full border border-border px-4 py-1.5 font-semibold transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="cursor-pointer rounded-full border border-border px-4 py-1.5 font-semibold transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        onClose={() => setSelected(null)}
        className="w-full max-w-lg rounded-2xl border border-border bg-surface p-6 text-ink"
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
    </div>
  );
}
