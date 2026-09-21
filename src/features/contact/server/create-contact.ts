import { contactSchema } from "@/features/contact/schema";
import { sendContactNotification } from "@/features/contact/server/send-notification";
import { getSupabaseAdmin } from "@/lib/supabase";

export type CreateContactResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "server" };

export async function createContact(
  input: unknown,
): Promise<CreateContactResult> {
  const parsed = contactSchema.safeParse(input);

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

  const { name, email, phone, reason, message } = parsed.data;

  try {
    const supabase = getSupabaseAdmin();

    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      phone: phone ? phone : null,
      reason,
      message,
    });

    if (error) {
      console.error("Error al guardar el contacto:", error);
      return { ok: false, reason: "server" };
    }
  } catch (error) {
    console.error("Error inesperado al guardar el contacto:", error);
    return { ok: false, reason: "server" };
  }

  try {
    await sendContactNotification({
      name,
      email,
      phone: phone ? phone : null,
      reason,
      message,
    });
  } catch (error) {
    console.error("No se pudo enviar el aviso por correo:", error);
  }

  return { ok: true };
}
