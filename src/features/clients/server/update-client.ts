import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { clientSchema } from "@/features/clients/schema";

export type UpdateClientResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "server" };

export async function updateClient(
  id: string,
  input: unknown,
): Promise<UpdateClientResult> {
  if (!id) {
    return { ok: false, reason: "server" };
  }

  const parsed = clientSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];

      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return { ok: false, reason: "invalid", fieldErrors };
  }

  const {
    representativeName,
    representativePhone,
    representativeEmail,
    patientName,
    patientBirthDate,
    notes,
  } = parsed.data;

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from("clients")
      .update({
        representative_name: representativeName,
        representative_phone: representativePhone,
        representative_email: representativeEmail,
        patient_name: patientName,
        patient_birth_date: patientBirthDate,
        notes,
      })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar el cliente:", error);
      return { ok: false, reason: "server" };
    }
  } catch (error) {
    console.error("Error inesperado al actualizar el cliente:", error);
    return { ok: false, reason: "server" };
  }

  return { ok: true };
}
