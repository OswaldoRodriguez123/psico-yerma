import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  eq: vi.fn(),
}));

vi.mock("@/lib/supabase/admin", () => ({
  getSupabaseAdmin: () => ({
    from: () => ({ delete: () => ({ eq: mocks.eq }) }),
  }),
}));

import { deleteClient } from "./delete-client";

describe("deleteClient", () => {
  beforeEach(() => {
    mocks.eq.mockReset().mockResolvedValue({ error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("elimina el cliente por id", async () => {
    const result = await deleteClient("cliente-1");

    expect(result).toEqual({ ok: true });
    expect(mocks.eq).toHaveBeenCalledWith("id", "cliente-1");
  });

  it("no hace nada si falta el id", async () => {
    const result = await deleteClient("");

    expect(result).toEqual({ ok: false });
    expect(mocks.eq).not.toHaveBeenCalled();
  });

  it("devuelve ok:false si falla la base de datos", async () => {
    mocks.eq.mockResolvedValue({ error: { message: "boom" } });

    const result = await deleteClient("cliente-1");

    expect(result).toEqual({ ok: false });
  });
});
