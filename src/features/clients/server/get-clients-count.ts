import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function getClientsCount(): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { count, error } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error al contar los clientes:", error);
    throw new Error("No se pudieron contar los clientes.");
  }

  return count ?? 0;
}
