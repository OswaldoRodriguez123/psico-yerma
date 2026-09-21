import { contactForm } from "@/content/site";

export type ContactNotification = {
  name: string;
  email: string | null;
  phone: string | null;
  reason: string;
  message: string;
};

export type NotificationEmail = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getReasonLabel(reason: string) {
  return (
    contactForm.reasons.find((item) => item.value === reason)?.label ?? reason
  );
}

function buildHtml(contact: ContactNotification) {
  const rows: Array<[string, string] | null> = [
    ["Nombre", contact.name],
    contact.email ? ["Correo", contact.email] : null,
    contact.phone ? ["Teléfono", contact.phone] : null,
    ["Motivo", getReasonLabel(contact.reason)],
  ];

  const rowsHtml = rows
    .filter((row): row is [string, string] => row !== null)
    .map(
      ([label, value]) => `
              <tr>
                <td style="padding:6px 0;color:#6c6880;width:90px;vertical-align:top;">${escapeHtml(label)}</td>
                <td style="padding:6px 0;color:#3e3a4a;font-weight:bold;">${escapeHtml(value)}</td>
              </tr>`,
    )
    .join("");

  const replyHtml = contact.email
    ? `<a href="mailto:${escapeHtml(contact.email)}" style="display:inline-block;margin-top:22px;background:#c3b4e0;color:#3e3a4a;text-decoration:none;padding:10px 20px;border-radius:9999px;font-weight:bold;">Responder a ${escapeHtml(contact.name)}</a>`
    : "";

  const receivedAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date());

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#fdfbf7;font-family:Arial,Helvetica,sans-serif;color:#3e3a4a;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <div style="background:#ffffff;border:1px solid #ece7f3;border-radius:16px;overflow:hidden;">
        <div style="background:#efeaf8;padding:20px 24px;">
          <p style="margin:0;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6c6880;">psico.yerma</p>
          <h1 style="margin:6px 0 0;font-size:20px;font-weight:bold;">Nuevo contacto desde el sitio web</h1>
        </div>
        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;">${rowsHtml}
          </table>
          <div style="margin-top:20px;">
            <p style="margin:0 0 6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6c6880;">Mensaje</p>
            <p style="margin:0;line-height:1.6;white-space:pre-wrap;">${escapeHtml(contact.message)}</p>
          </div>
          ${replyHtml}
        </div>
        <div style="padding:16px 24px;background:#fdfbf7;border-top:1px solid #ece7f3;font-size:12px;color:#6c6880;">
          Recibido el ${escapeHtml(receivedAt)}
        </div>
      </div>
    </div>
  </body>
</html>`;
}

function buildText(contact: ContactNotification) {
  const lines = [
    "Nuevo contacto desde el sitio web",
    "",
    `Nombre: ${contact.name}`,
    contact.email ? `Correo: ${contact.email}` : null,
    contact.phone ? `Teléfono: ${contact.phone}` : null,
    `Motivo: ${getReasonLabel(contact.reason)}`,
    "",
    contact.message,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function buildNotificationEmail(
  contact: ContactNotification,
): NotificationEmail {
  return {
    subject: `Nuevo contacto de ${contact.name}`,
    html: buildHtml(contact),
    text: buildText(contact),
  };
}
