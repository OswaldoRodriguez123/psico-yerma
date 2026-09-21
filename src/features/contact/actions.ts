"use server";

import { revalidatePath } from "next/cache";
import { updateContactStatus } from "@/features/contact/server/update-contact-status";

export async function updateContactStatusAction(id: string, status: string) {
  await updateContactStatus(id, status);
  revalidatePath("/admin/contactos");
  revalidatePath("/admin");
}
