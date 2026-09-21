import type { Metadata } from "next";
import { contactForm } from "@/content/site";
import {
  listContacts,
  type ContactRow,
} from "@/features/contact/server/list-contacts";

export const metadata: Metadata = {
  title: "Contactos",
};

const statusStyles: Record<string, { label: string; className: string }> = {
  new: { label: "Nuevo", className: "bg-primary-soft text-ink" },
  contacted: { label: "Contactado", className: "bg-success-soft text-success" },
  closed: { label: "Cerrado", className: "bg-border text-ink-soft" },
};

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

export default async function AdminContactsPage() {
  let contacts: ContactRow[] = [];
  let failed = false;

  try {
    contacts = await listContacts();
  } catch {
    failed = true;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Contactos</h1>
      <p className="mt-2 text-ink-soft">
        Mensajes recibidos desde el formulario del sitio.
      </p>

      {failed ? (
        <p className="mt-6 rounded-2xl bg-danger-soft px-4 py-3 text-danger">
          No se pudieron cargar los contactos. Inténtalo más tarde.
        </p>
      ) : contacts.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-border bg-surface px-4 py-6 text-center text-ink-soft">
          Aún no hay contactos.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Fecha</th>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Contacto</th>
                <th className="px-4 py-3 font-semibold">Motivo</th>
                <th className="px-4 py-3 font-semibold">Mensaje</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => {
                const status = statusStyles[contact.status] ?? {
                  label: contact.status,
                  className: "bg-border text-ink-soft",
                };

                return (
                  <tr
                    key={contact.id}
                    className="border-t border-border align-top"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-ink-soft">
                      {dateFormatter.format(new Date(contact.created_at))}
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
                    <td className="max-w-sm px-4 py-3 whitespace-pre-wrap text-ink-soft">
                      {contact.message}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
