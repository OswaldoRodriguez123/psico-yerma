import type { Metadata } from "next";
import { ClientForm } from "@/features/clients/components/ClientForm";
import {
  listClients,
  type ClientRow,
} from "@/features/clients/server/list-clients";
import { cardClass } from "@/components/styles";

export const metadata: Metadata = {
  title: "Clientes",
};

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeZone: "America/Santiago",
});

const birthDateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeZone: "UTC",
});

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

      {failed ? (
        <p className="mt-6 rounded-2xl bg-danger-soft px-4 py-3 text-danger">
          No se pudieron cargar los clientes. Inténtalo más tarde.
        </p>
      ) : clients.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-border bg-surface px-4 py-6 text-center text-ink-soft">
          Aún no hay clientes registrados.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="bg-primary-soft text-ink">
              <tr>
                <th className="px-4 py-3 font-semibold">Registro</th>
                <th className="px-4 py-3 font-semibold">Representante</th>
                <th className="px-4 py-3 font-semibold">Paciente</th>
                <th className="px-4 py-3 font-semibold">Notas</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-t border-border align-top">
                  <td className="px-4 py-3 whitespace-nowrap text-ink-soft">
                    {dateFormatter.format(new Date(client.created_at))}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    <span className="block font-semibold text-ink">
                      {client.representative_name}
                    </span>
                    <span className="block">{client.representative_phone}</span>
                    {client.representative_email ? (
                      <span className="block">
                        {client.representative_email}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
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
                  </td>
                  <td className="max-w-sm px-4 py-3 whitespace-pre-wrap text-ink-soft">
                    {client.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
