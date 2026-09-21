import { describe, expect, it } from "vitest";
import { buildNotificationEmail } from "./notification-template";

const contact = {
  name: "Ana Pérez",
  email: "ana@example.com",
  phone: "+56912345678",
  reason: "consulta",
  message: "Hola, quiero agendar una hora.",
};

describe("buildNotificationEmail", () => {
  it("arma el asunto con el nombre", () => {
    expect(buildNotificationEmail(contact).subject).toBe(
      "Nuevo contacto de Ana Pérez",
    );
  });

  it("incluye los datos y la etiqueta legible del motivo", () => {
    const email = buildNotificationEmail(contact);

    expect(email.html).toContain("Ana Pérez");
    expect(email.html).toContain("ana@example.com");
    expect(email.html).toContain("+56912345678");
    expect(email.html).toContain("Consulta general");
    expect(email.text).toContain("Hola, quiero agendar una hora.");
  });

  it("escapa el HTML de los datos del usuario", () => {
    const email = buildNotificationEmail({
      ...contact,
      name: "Ana <script>alert(1)</script>",
      message: "<b>hola</b>",
    });

    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).not.toContain("<b>hola</b>");
  });

  it("omite correo, teléfono y botón de responder cuando no vienen", () => {
    const email = buildNotificationEmail({
      ...contact,
      email: null,
      phone: null,
    });

    expect(email.html).not.toContain("ana@example.com");
    expect(email.html).not.toContain("+56912345678");
    expect(email.html).not.toContain("Responder a");
  });
});
