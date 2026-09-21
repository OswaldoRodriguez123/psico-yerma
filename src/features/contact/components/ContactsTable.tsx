"use client";

import { useMemo, useRef, useState } from "react";
import { contactForm } from "@/content/site";
import type { ContactRow } from "@/features/contact/server/list-contacts";
import { buttonClass } from "@/components/styles";
import { CloseIcon } from "@/components/ui/icons";

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santiago",
});

function reasonLabel(reason: string) {
  return (
    contactForm.reasons.find((item) => item.value === reason)?.label ?? reason
  );
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export function ContactsTable({ contacts }: { contacts: ContactRow[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ContactRow | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) {
      return contacts;
    }

    return contacts.filter((contact) =>
      [
        contact.name,
        contact.email,
        contact.phone,
        contact.message,
        reasonLabel(contact.reason),
      ].some((value) => value?.toLowerCase().includes(term)),
    );
  }, [contacts, query]);

  function openDetail(contact: ContactRow) {
    setSelected(contact);
    dialogRef.current?.showModal();
  }

  function closeDetail() {
    dialogRef.current?.close();
    setSelected(null);
  }

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Buscar por nombre, contacto o mensaje…"
        aria-label="Buscar contactos"
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary"
      />

      {filtered.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-border bg-surface px-4 py-6 text-center text-ink-soft">
          No se encontraron contactos.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Contacto</th>
                <th className="px-4 py-3 font-semibold">Motivo</th>
                <th className="px-4 py-3 font-semibold">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr key={contact.id} className="border-t border-border">
                  <td className="px-4 py-3 whitespace-nowrap text-ink-soft">
                    {formatDate(contact.created_at)}
                  </td>
                  <td className="px-4 py-3 font-semibold text-ink">
                    {contact.name}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    {contact.email ? (
                      <span className="block">{contact.email}</span>
                    ) : null}
                    {contact.phone ? (
                      <span className="block">{contact.phone}</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    {reasonLabel(contact.reason)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => openDetail(contact)}
                      className="cursor-pointer font-semibold text-ink-soft transition-colors hover:text-ink"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
