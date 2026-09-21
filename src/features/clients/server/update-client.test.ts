import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  update: vi.fn(),
  eq: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({
      update: (values: unknown) => {
        mocks.update(values);
        return { eq: mocks.eq };
      },
    }),
  }),
}));

import { updateClient } from "./update-client";

const validClient = {
  representativeName: "María Pérez",
  representativePhone: "+56 9 1234 5678",
  representativeEmail: "maria@example.com",
  patientName: "Juan Pérez",
  patientBirthDate: "2015-05-03",
  notes: "Nota actualizada.",
};

describe("updateClient", () => {
  beforeEach(() => {
    mocks.update.mockReset();
    mocks.eq.mockReset().mockResolvedValue({ error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("actualiza el cliente con datos normalizados", async () => {
    const result = await updateClient("cliente-1", validClient);

    expect(result.ok).toBe(true);
    expect(mocks.update).toHaveBeenCalledOnce();
    expect(mocks.update.mock.calls[0][0]).toMatchObject({
      representative_phone: "+56912345678",
      patient_name: "Juan Pérez",
      notes: "Nota actualizada.",
    });
    expect(mocks.eq).toHaveBeenCalledWith("id", "cliente-1");
  });

  it("rechaza datos inválidos con errores por campo", async () => {
    const result = await updateClient("cliente-1", {
      ...validClient,
      patientName: "",
    });

    expect(result.ok).toBe(false);

    if (!result.ok && result.reason === "invalid") {
      expect(result.fieldErrors.patientName).toBeTruthy();
    } else {
      throw new Error("se esperaba un fallo de validación");
    }

    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("devuelve server si falta el id", async () => {
    const result = await updateClient("", validClient);

    expect(result.ok).toBe(false);
    expect(mocks.update).not.toHaveBeenCalled();
  });

  it("devuelve server si falla la base de datos", async () => {
    mocks.eq.mockResolvedValue({ error: { message: "boom" } });

    const result = await updateClient("cliente-1", validClient);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.reason).toBe("server");
    }
  });
});
