"use client";

import { useMemo } from "react";
import { createColumnHelper, type FilterFn } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { DetailDialog, DetailItem } from "@/components/ui/DetailDialog";
import { AddClientDialog } from "@/features/clients/components/AddClientDialog";
import { ClientEditForm } from "@/features/clients/components/ClientEditForm";
import { DeleteClientButton } from "@/features/clients/components/DeleteClientButton";
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

const clientFilter: FilterFn<ClientRow> = (row, _columnId, filterValue) => {
  const term = String(filterValue).toLowerCase();
  const client = row.original;

  return [
    client.representative_name,
    client.representative_phone,
    client.representative_email,
    client.patient_name,
    client.patient_birth_date,
    client.notes,
  ].some((value) => value?.toLowerCase().includes(term));
};

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
      columnHelper.display({
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => {
          const client = row.original;

          return (
            <div className="text-right">
              <DetailDialog
                title={client.patient_name}
                actions={<DeleteClientButton id={client.id} />}
                editContent={({ onSaved, onCancel }) => (
                  <ClientEditForm
                    client={client}
                    onSaved={onSaved}
                    onCancel={onCancel}
                  />
                )}
              >
                <dl className="space-y-3 text-sm">
                  <DetailItem label="Registro">
                    {dateFormatter.format(new Date(client.created_at))}
                  </DetailItem>
                  <DetailItem label="Representante">
                    <span className="block font-semibold text-ink">
                      {client.representative_name}
                    </span>
                    <span className="block">
                      {client.representative_phone}
                    </span>
                    {client.representative_email ? (
                      <span className="block">
                        {client.representative_email}
                      </span>
                    ) : null}
                  </DetailItem>
                  <DetailItem label="Paciente">
                    <span className="block font-semibold text-ink">
                      {client.patient_name}
                    </span>
                    {client.patient_birth_date ? (
                      <span className="block">
                        {birthDateFormatter.format(
                          new Date(client.patient_birth_date),
                        )}
                      </span>
                    ) : null}
                  </DetailItem>
                  {client.notes ? (
                    <DetailItem label="Notas">
                      <span className="whitespace-pre-wrap">
                        {client.notes}
                      </span>
                    </DetailItem>
                  ) : null}
                </dl>
              </DetailDialog>
            </div>
          );
        },
      }),
    ],
    [],
  );

  return (
    <DataTable
      data={clients}
      columns={columns}
      globalFilterFn={clientFilter}
      initialSorting={[{ id: "created_at", desc: true }]}
      searchPlaceholder="Buscar por representante, paciente o notas…"
      emptyMessage="Aún no hay clientes registrados."
      toolbarAction={<AddClientDialog />}
    />
  );
}
