"use client";

import { useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import type { ClientRow } from "@/features/clients/server/list-clients";

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeZone: "America/Santiago",
});

const birthDateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeZone: "UTC",
});

const columnHelper = createColumnHelper<ClientRow>();

export function ClientsTable({ clients }: { clients: ClientRow[] }) {
  const columns = useMemo(
    () => [
      columnHelper.accessor("created_at", {
        header: "Registro",
        cell: (info) => (
          <span className="whitespace-nowrap">
            {dateFormatter.format(new Date(info.getValue()))}
          </span>
        ),
      }),
      columnHelper.accessor(
        (row) =>
          [
            row.representative_name,
            row.representative_phone,
            row.representative_email,
          ]
            .filter(Boolean)
            .join(" "),
        {
          id: "representative",
          header: "Representante",
          cell: ({ row }) => (
            <>
              <span className="block font-semibold text-ink">
                {row.original.representative_name}
              </span>
              <span className="block">
                {row.original.representative_phone}
              </span>
              {row.original.representative_email ? (
                <span className="block">
                  {row.original.representative_email}
                </span>
              ) : null}
            </>
          ),
        },
      ),
      columnHelper.accessor(
        (row) =>
          [row.patient_name, row.patient_birth_date]
            .filter(Boolean)
            .join(" "),
        {
          id: "patient",
          header: "Paciente",
          cell: ({ row }) => (
            <>
              <span className="block font-semibold text-ink">
                {row.original.patient_name}
              </span>
              {row.original.patient_birth_date ? (
                <span className="block">
                  {birthDateFormatter.format(
                    new Date(row.original.patient_birth_date),
                  )}
                </span>
              ) : null}
            </>
          ),
        },
      ),
      columnHelper.accessor("notes", {
        header: "Notas",
        cell: (info) => (
          <span className="block max-w-sm whitespace-pre-wrap">
            {info.getValue()}
          </span>
        ),
      }),
    ],
    [],
  );

  return (
    <DataTable
      data={clients}
      columns={columns}
      initialSorting={[{ id: "created_at", desc: true }]}
      searchPlaceholder="Buscar por representante, paciente o notas…"
      emptyMessage="Aún no hay clientes registrados."
    />
  );
}
