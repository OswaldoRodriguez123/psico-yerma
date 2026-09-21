import type { Metadata } from "next";
import { ClientsTable } from "@/features/clients/components/ClientsTable";
import {
  listClients,
  type ClientRow,
} from "@/features/clients/server/list-clients";

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

      <div className="mt-6">
        {failed ? (
          <p className="rounded-2xl bg-danger-soft px-4 py-3 text-danger">
            No se pudieron cargar los clientes. Inténtalo más tarde.
          </p>
        ) : (
          <ClientsTable clients={clients} />
        )}
      </div>
    </div>
  );
}
