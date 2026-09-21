import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createContact: vi.fn(),
}));

vi.mock("@/features/contact/server/create-contact", () => ({
  createContact: mocks.createContact,
}));

import { POST } from "./route";

function requestWith(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    mocks.createContact.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("responde 400 si el cuerpo no es JSON válido", async () => {
    const response = await POST(requestWith("{no-json"));

    expect(response.status).toBe(400);
    expect(mocks.createContact).not.toHaveBeenCalled();
  });

  it("responde 400 con fieldErrors cuando la validación falla", async () => {
    mocks.createContact.mockResolvedValue({
      ok: false,
      reason: "invalid",
      fieldErrors: { email: "Ingresa un correo válido." },
    });

    const response = await POST(requestWith({}));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.fieldErrors.email).toBeTruthy();
  });

  it("responde 500 cuando falla el servidor", async () => {
    mocks.createContact.mockResolvedValue({ ok: false, reason: "server" });

    const response = await POST(requestWith({}));

    expect(response.status).toBe(500);
  });

  it("responde 201 cuando el contacto se crea", async () => {
    mocks.createContact.mockResolvedValue({ ok: true });

    const response = await POST(requestWith({}));

    expect(response.status).toBe(201);
  });
});
