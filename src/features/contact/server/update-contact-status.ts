import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const contactStatuses = ["new", "contacted", "closed"] as const;
export type ContactStatus = (typeof contactStatuses)[number];

export async function updateContactStatus(
  id: string,
  status: string,
): Promise<{ ok: boolean }> {
  if (!id || !contactStatuses.includes(status as ContactStatus)) {
    return { ok: false };
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Error al actualizar el estado del contacto:", error);
    return { ok: false };
  }

  return { ok: true };
}
