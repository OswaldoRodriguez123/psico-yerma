import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  insert: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({ insert: mocks.insert }),
  }),
}));

import { createClientRecord } from "./create-client";

const validClient = {
  representativeName: "María Pérez",
  representativePhone: "+56 9 1234 5678",
  representativeEmail: "maria@example.com",
  patientName: "Juan Pérez",
  patientBirthDate: "2015-05-03",
  notes: "Primera consulta.",
};

describe("createClientRecord", () => {
  beforeEach(() => {
    mocks.insert.mockReset().mockResolvedValue({ error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("guarda el cliente con datos normalizados", async () => {
    const result = await createClientRecord(validClient);

    expect(result.ok).toBe(true);
    expect(mocks.insert).toHaveBeenCalledOnce();
    expect(mocks.insert.mock.calls[0][0]).toMatchObject({
      representative_name: "María Pérez",
      representative_phone: "+56912345678",
      patient_name: "Juan Pérez",
      patient_birth_date: "2015-05-03",
    });
  });

  it("rechaza datos inválidos con errores por campo", async () => {
    const result = await createClientRecord({
      ...validClient,
      representativePhone: "abc",
    });

    expect(result.ok).toBe(false);

    if (!result.ok && result.reason === "invalid") {
      expect(result.fieldErrors.representativePhone).toBeTruthy();
    } else {
      throw new Error("se esperaba un fallo de validación");
    }

    expect(mocks.insert).not.toHaveBeenCalled();
  });

  it("deja en null los campos opcionales vacíos", async () => {
    const result = await createClientRecord({
      representativeName: "María Pérez",
      representativePhone: "912345678",
      representativeEmail: "",
      patientName: "Juan Pérez",
      patientBirthDate: "",
      notes: "",
    });

    expect(result.ok).toBe(true);
    expect(mocks.insert.mock.calls[0][0]).toMatchObject({
      representative_email: null,
      patient_birth_date: null,
      notes: null,
    });
  });

  it("devuelve server si falla la base de datos", async () => {
    mocks.insert.mockResolvedValue({ error: { message: "boom" } });

    const result = await createClientRecord(validClient);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.reason).toBe("server");
    }
  });
});
