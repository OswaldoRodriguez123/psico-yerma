import type { Metadata } from "next";
import { ContactsTable } from "@/features/contact/components/ContactsTable";
import { listContacts, type ContactRow } from "@/features/contact/server/list-contacts";

export const metadata: Metadata = {
  title: "Contactos",
};

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

      <div className="mt-6">
        {failed ? (
          <p className="rounded-2xl bg-danger-soft px-4 py-3 text-danger">
            No se pudieron cargar los contactos. Inténtalo más tarde.
          </p>
        ) : contacts.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-4 py-6 text-center text-ink-soft">
            Aún no hay contactos.
          </p>
        ) : (
          <ContactsTable contacts={contacts} />
        )}
      </div>
    </div>
  );
}
