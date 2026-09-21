import { contactForm } from "@/content/site";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type ContactStats = {
  total: number;
  pending: number;
  last30Days: number;
  perMonth: { label: string; value: number }[];
  byReason: { label: string; value: number }[];
};

const monthFormatter = new Intl.DateTimeFormat("es-CL", {
  month: "short",
  timeZone: "UTC",
});

function monthKey(date: Date) {
  return `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
}

export async function getContactStats(): Promise<ContactStats> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contacts")
    .select("status, reason, created_at");

  if (error) {
    console.error("Error al cargar las estadísticas de contactos:", error);
    throw new Error("No se pudieron cargar las estadísticas.");
  }

  const rows = data ?? [];
  const now = new Date();
  const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;

  const months: { key: string; label: string; value: number }[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    months.push({
      key: monthKey(date),
      label: monthFormatter.format(date),
      value: 0,
    });
  }

  const monthIndex = new Map(months.map((month, index) => [month.key, index]));
  const reasonCounts = new Map<string, number>();

  let pending = 0;
  let last30Days = 0;

  for (const row of rows) {
    const created = new Date(row.created_at);

    if (row.status === "new") {
      pending += 1;
    }

    if (created.getTime() >= thirtyDaysAgo) {
      last30Days += 1;
    }

    const index = monthIndex.get(monthKey(created));

    if (index !== undefined) {
      months[index].value += 1;
    }

    reasonCounts.set(row.reason, (reasonCounts.get(row.reason) ?? 0) + 1);
  }

  const byReason = contactForm.reasons
    .map((reason) => ({
      label: reason.label,
      value: reasonCounts.get(reason.value) ?? 0,
    }))
    .filter((item) => item.value > 0);

  return {
    total: rows.length,
    pending,
    last30Days,
    perMonth: months.map(({ label, value }) => ({ label, value })),
    byReason,
  };
}
