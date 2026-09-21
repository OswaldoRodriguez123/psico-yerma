import type { Metadata } from "next";
import { ClientForm } from "@/features/clients/components/ClientForm";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import {
  listClients,
  type ClientRow,
} from "@/features/clients/server/list-clients";
import { cardClass } from "@/components/styles";

export const metadata: Metadata = {
  title: "Clientes",
};

export default async function AdminClientsPage() {
  let clients: ClientRow[] = [];
  let failed = false;

  try {
    clients = await listClients();
  } catch {
    failed = true;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Clientes</h1>
      <p className="mt-2 text-ink-soft">
        Registra y consulta los datos de tus clientes.
      </p>

      <details className={`mt-6 ${cardClass}`}>
        <summary className="cursor-pointer font-bold text-ink">
          Añadir cliente
        </summary>
        <div className="mt-5">
          <ClientForm />
        </div>
      </details>

      <div className="mt-6">
        {failed ? (
          <p className="rounded-2xl bg-danger-soft px-4 py-3 text-danger">
            No se pudieron cargar los clientes. Inténtalo más tarde.
          </p>
        ) : clients.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-4 py-6 text-center text-ink-soft">
            Aún no hay clientes registrados.
          </p>
        ) : (
          <ClientsTable clients={clients} />
        )}
      </div>
    </div>
  );
}
