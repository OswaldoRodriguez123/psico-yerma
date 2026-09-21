"use server";

import { revalidatePath } from "next/cache";
import { createClientRecord } from "@/features/clients/server/create-client";

export type ClientFormState =
  | { fieldErrors?: Record<string, string>; error?: string; success?: boolean }
  | undefined;

export async function createClientAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const result = await createClientRecord({
    representativeName: String(formData.get("representativeName") ?? ""),
    representativePhone: String(formData.get("representativePhone") ?? ""),
    representativeEmail: String(formData.get("representativeEmail") ?? ""),
    patientName: String(formData.get("patientName") ?? ""),
    patientBirthDate: String(formData.get("patientBirthDate") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });

  if (!result.ok && result.reason === "invalid") {
    return { fieldErrors: result.fieldErrors };
  }

  if (!result.ok) {
    return { error: "No se pudo guardar el cliente. Inténtalo más tarde." };
  }

  revalidatePath("/admin/clientes");
  return { success: true };
}
