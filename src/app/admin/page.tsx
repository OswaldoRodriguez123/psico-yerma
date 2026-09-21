import Link from "next/link";
import { contactForm, site } from "@/content/site";
import {
  listContacts,
  type ContactRow,
} from "@/features/contact/server/list-contacts";
import {
  getContactStats,
  type ContactStats,
} from "@/features/contact/server/get-contact-stats";
import { getClientsCount } from "@/features/clients/server/get-clients-count";
import { BarChart } from "@/components/ui/BarChart";
import { DonutChart } from "@/components/ui/DonutChart";
import { buttonClass, cardClass, cardTitleClass } from "@/components/styles";

const dateFormatter = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeZone: "America/Santiago",
});

function reasonLabel(reason: string) {
  return (
    contactForm.reasons.find((item) => item.value === reason)?.label ?? reason
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className={cardClass}>
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-1 text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

export default async function AdminHomePage() {
  let stats: ContactStats | null = null;
  let recent: ContactRow[] = [];
  let failed = false;

  try {
    [stats, recent] = await Promise.all([
      getContactStats(),
      listContacts().then((rows) => rows.slice(0, 5)),
    ]);
  } catch {
    failed = true;
  }

  let clientsCount: number | null = null;

  try {
    clientsCount = await getClientsCount();
  } catch {
    clientsCount = null;
  }

  if (failed || !stats) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-ink">Panel</h1>
        <p className="mt-6 rounded-2xl bg-danger-soft px-4 py-3 text-danger">
          No se pudieron cargar los datos. Inténtalo más tarde.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Panel</h1>
      <p className="mt-2 text-ink-soft">Resumen de {site.professionalName}.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Contactos nuevos" value={stats.pending} />
        <Stat label="Contactos totales" value={stats.total} />
        <Stat label="Últimos 30 días" value={stats.last30Days} />
        <Stat label="Clientes" value={clientsCount ?? "—"} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className={cardClass}>
          <h2 className={cardTitleClass}>Contactos por mes</h2>
          <div className="mt-4">
            <BarChart data={stats.perMonth} />
          </div>
        </section>

        <section className={cardClass}>
          <h2 className={cardTitleClass}>Contactos por motivo</h2>
          <div className="mt-4">
            <DonutChart data={stats.byReason} />
          </div>
        </section>
      </div>

      <section className={`mt-6 ${cardClass}`}>
        <h2 className={cardTitleClass}>Últimos contactos</h2>

        {recent.length === 0 ? (
          <p className="mt-4 text-ink-soft">Aún no hay contactos.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {recent.map((contact) => (
              <li
                key={contact.id}
                className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm"
              >
                <span className="font-semibold text-ink">{contact.name}</span>
                <span className="text-ink-soft">
                  {reasonLabel(contact.reason)}
                </span>
                <span className="text-ink-soft">
                  {dateFormatter.format(new Date(contact.created_at))}
                </span>
              </li>
            ))}
          </ul>
        )}

        <Link
          href="/admin/contactos"
          className={`mt-5 inline-block ${buttonClass}`}
        >
          Ver contactos
        </Link>
      </section>
    </div>
  );
}
