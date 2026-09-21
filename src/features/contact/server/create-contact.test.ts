import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
  sendContactNotification: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({ insert: mocks.insert }),
  }),
}));

vi.mock("@/features/contact/server/send-notification", () => ({
  sendContactNotification: mocks.sendContactNotification,
}));

import { createContact } from "./create-contact";

const validContact = {
  name: "Ana Pérez",
  email: "ana@example.com",
  phone: "+56 9 1234 5678",
  reason: "consulta",
  message: "Hola, quiero agendar una hora.",
};

describe("createContact", () => {
  beforeEach(() => {
    mocks.insert.mockReset().mockResolvedValue({ error: null });
    mocks.sendContactNotification.mockReset().mockResolvedValue(undefined);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rechaza datos inválidos con errores por campo", async () => {
    const result = await createContact({ ...validContact, email: "mal" });

    expect(result.ok).toBe(false);

    if (!result.ok && result.reason === "invalid") {
      expect(result.fieldErrors.email).toBeTruthy();
    } else {
      throw new Error("se esperaba un fallo de validación");
    }

    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("guarda el contacto, envía el aviso y devuelve ok", async () => {
    const result = await createContact(validContact);

    expect(result.ok).toBe(true);
    expect(mocks.insert).toHaveBeenCalledOnce();
    expect(mocks.insert.mock.calls[0][0]).toMatchObject({
      name: "Ana Pérez",
      email: "ana@example.com",
      phone: "+56912345678",
      reason: "consulta",
    });
    expect(mocks.sendContactNotification).toHaveBeenCalledOnce();
  });

  it("acepta un contacto con solo teléfono", async () => {
    const result = await createContact({
      name: "Ana Pérez",
      phone: "+56 9 1234 5678",
      reason: "consulta",
      message: "Hola, quiero agendar una hora.",
    });

    expect(result.ok).toBe(true);
  });

  it("acepta un contacto con solo correo", async () => {
    const result = await createContact({
      name: "Ana Pérez",
      email: "ana@example.com",
      reason: "consulta",
      message: "Hola, quiero agendar una hora.",
    });

    expect(result.ok).toBe(true);
  });

  it("rechaza si no hay correo ni teléfono", async () => {
    const result = await createContact({
      name: "Ana Pérez",
      reason: "consulta",
      message: "Hola, quiero agendar una hora.",
    });

    expect(result.ok).toBe(false);
    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("devuelve server y no envía correo si falla la base de datos", async () => {
    mocks.insert.mockResolvedValue({ error: { message: "boom" } });

    const result = await createContact(validContact);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.reason).toBe("server");
    }

    expect(mocks.sendContactNotification).not.toHaveBeenCalled();
  });

  it("devuelve ok aunque falle el envío del correo", async () => {
    mocks.sendContactNotification.mockRejectedValue(new Error("resend caído"));

    const result = await createContact(validContact);

    expect(result.ok).toBe(true);
    expect(mocks.insert).toHaveBeenCalledOnce();
  });
});
