"use client";

import { useMemo } from "react";
import { createColumnHelper, type FilterFn } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/DataTable";
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

export function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
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
        cell: ({ row }) => (
          <ContactStatusSelect
            id={row.original.id}
            status={row.original.status}
          />
        ),
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
      data={contacts}
      columns={columns}
      globalFilterFn={contactFilter}
      initialSorting={[{ id: "created_at", desc: true }]}
      searchPlaceholder="Buscar por nombre, contacto o mensaje…"
      emptyMessage="No se encontraron contactos."
    />
  );
}
