import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type ContactRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  reason: string;
  message: string;
  status: string;
  created_at: string;
};

export async function listContacts(): Promise<ContactRow[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contacts")
    .select("id, name, email, phone, reason, message, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al listar contactos:", error);
    throw new Error("No se pudieron cargar los contactos.");
  }

  return data ?? [];
}
