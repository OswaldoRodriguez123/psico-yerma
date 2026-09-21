import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./verify-turnstile";

describe("verifyTurnstile", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("omite la verificación si no hay secret configurado", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(await verifyTurnstile(undefined)).toBe(true);
  });

  it("rechaza si hay secret pero no hay token", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");

    expect(await verifyTurnstile(undefined)).toBe(false);
  });

  it("devuelve true cuando Cloudflare responde success", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ success: true }) }),
    );

    expect(await verifyTurnstile("token")).toBe(true);
  });

  it("devuelve false cuando Cloudflare responde failure", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ json: async () => ({ success: false }) }),
    );

    expect(await verifyTurnstile("token")).toBe(false);
  });
});
