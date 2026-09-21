import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type ClientRow = {
  id: string;
  representative_name: string;
  representative_phone: string;
  representative_email: string | null;
  patient_name: string;
  patient_birth_date: string | null;
  notes: string | null;
  created_at: string;
};

export async function listClients(): Promise<ClientRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("clients")
    .select(
      "id, representative_name, representative_phone, representative_email, patient_name, patient_birth_date, notes, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al listar clientes:", error);
    throw new Error("No se pudieron cargar los clientes.");
  }

  return data ?? [];
}
