"use server";

import { revalidatePath } from "next/cache";
import { createClientRecord } from "@/features/clients/server/create-client";
import { updateClient } from "@/features/clients/server/update-client";
import { deleteClient } from "@/features/clients/server/delete-client";

export type ClientFormState =
  | { fieldErrors?: Record<string, string>; error?: string; success?: boolean }
  | undefined;

function readClientForm(formData: FormData) {
  return {
    representativeName: String(formData.get("representativeName") ?? ""),
    representativePhone: String(formData.get("representativePhone") ?? ""),
    representativeEmail: String(formData.get("representativeEmail") ?? ""),
    patientName: String(formData.get("patientName") ?? ""),
    patientBirthDate: String(formData.get("patientBirthDate") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  };
}

export async function createClientAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const result = await createClientRecord(readClientForm(formData));

  if (!result.ok && result.reason === "invalid") {
    return { fieldErrors: result.fieldErrors };
  }

  if (!result.ok) {
    return { error: "No se pudo guardar el cliente. Inténtalo más tarde." };
  }

  revalidatePath("/admin/clientes");
  return { success: true };
}

export async function updateClientAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const id = String(formData.get("id") ?? "");
  const result = await updateClient(id, readClientForm(formData));

  if (!result.ok && result.reason === "invalid") {
    return { fieldErrors: result.fieldErrors };
  }

  if (!result.ok) {
    return { error: "No se pudo guardar el cliente. Inténtalo más tarde." };
  }

  revalidatePath("/admin/clientes");
  return { success: true };
}

export async function deleteClientAction(id: string) {
  await deleteClient(id);
  revalidatePath("/admin/clientes");
  revalidatePath("/admin");
}
