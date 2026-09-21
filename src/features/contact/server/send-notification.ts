import { Resend } from "resend";
import {
  buildNotificationEmail,
  type ContactNotification,
} from "@/features/contact/server/notification-template";

export async function sendContactNotification(contact: ContactNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn(
      "Aviso por correo omitido: faltan RESEND_API_KEY o CONTACT_TO_EMAIL.",
    );
    return;
  }

  const email = buildNotificationEmail(contact);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: contact.email ?? undefined,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    throw new Error(error.message);
  }
}
