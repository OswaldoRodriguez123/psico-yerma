import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function deleteClient(id: string): Promise<{ ok: boolean }> {
  if (!id) {
    return { ok: false };
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    console.error("Error al eliminar el cliente:", error);
    return { ok: false };
  }

  return { ok: true };
}
