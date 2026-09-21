"use client";

import { useMemo, useState } from "react";
import { createColumnHelper, type FilterFn } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
import { Select } from "@/components/ui/Select";
import { DetailDialog, DetailItem } from "@/components/ui/DetailDialog";
import { ContactStatusSelect } from "@/features/contact/components/ContactStatusSelect";
import { contactForm } from "@/content/site";
import type { ContactRow } from "@/features/contact/server/list-contacts";
import { buttonClass } from "@/components/styles";

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

const statusStyles: Record<string, { label: string; className: string }> = {
  new: { label: "Nuevo", className: "bg-primary-soft text-ink" },
  contacted: { label: "Contactado", className: "bg-success-soft text-success" },
  closed: { label: "Cerrado", className: "bg-border text-ink-soft" },
};

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] ?? {
    label: status,
    className: "bg-border text-ink-soft",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${style.className}`}
    >
      {style.label}
    </span>
  );
}

export function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  const [statusFilter, setStatusFilter] = useState("new");

  const filteredContacts = useMemo(
    () =>
      statusFilter === "all"
        ? contacts
        : contacts.filter((contact) => contact.status === statusFilter),
    [contacts, statusFilter],
  );

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
      columnHelper.accessor("status", {
        header: "Estado",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => {
          const contact = row.original;

          return (
            <div className="text-right">
              <DetailDialog
                title={contact.name}
                actions={
                  <>
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className={buttonClass}
                      >
                        Responder por correo
                      </a>
                    ) : null}
                    {contact.phone ? (
                      <a
                        href={`https://wa.me/${contact.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonClass}
                      >
                        Escribir por WhatsApp
                      </a>
                    ) : null}
                  </>
                }
              >
                <dl className="space-y-3 text-sm">
                  <DetailItem label="Fecha">
                    {formatDate(contact.created_at)}
                  </DetailItem>
                  <DetailItem label="Motivo">
                    {reasonLabel(contact.reason)}
                  </DetailItem>
                  <DetailItem label="Estado">
                    <ContactStatusSelect
                      id={contact.id}
                      status={contact.status}
                    />
                  </DetailItem>
                  {contact.email ? (
                    <DetailItem label="Correo">{contact.email}</DetailItem>
                  ) : null}
                  {contact.phone ? (
                    <DetailItem label="Teléfono">{contact.phone}</DetailItem>
                  ) : null}
                  <DetailItem label="Mensaje">
                    <span className="whitespace-pre-wrap">
                      {contact.message}
                    </span>
                  </DetailItem>
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
      data={filteredContacts}
      columns={columns}
      getRowId={(row) => row.id}
      globalFilterFn={contactFilter}
      initialSorting={[{ id: "created_at", desc: true }]}
      searchPlaceholder="Buscar por nombre, contacto o mensaje…"
      emptyMessage="No hay contactos en este estado."
      toolbarAction={
        <Select
          size="sm"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filtrar por estado"
          className="cursor-pointer rounded-lg border border-border bg-surface py-2 pl-3 text-ink"
        >
          <option value="new">Nuevos</option>
          <option value="contacted">Contactados</option>
          <option value="closed">Cerrados</option>
          <option value="all">Todos</option>
        </Select>
      }
    />
  );
}
