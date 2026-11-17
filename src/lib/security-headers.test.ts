import { afterEach, describe, expect, it, vi } from "vitest";
import { securityHeaders } from "./security-headers";

function header(name: string, headers = securityHeaders): string {
  const match = headers.find(
    (entry) => entry.key.toLowerCase() === name.toLowerCase(),
  );
  return match?.value ?? "";
}

async function loadedHeaders() {
  vi.resetModules();
  return import("./security-headers");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("securityHeaders", () => {
  it("declara las cinco cabeceras que exige la auditoría", () => {
    expect(header("Content-Security-Policy")).not.toBe("");
    expect(header("X-Content-Type-Options")).toBe("nosniff");
    expect(header("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(header("X-Frame-Options")).toBe("DENY");
    expect(header("Permissions-Policy")).toContain("camera=()");
  });

  it("la CSP permite el widget de Turnstile y bloquea iframes ajenos", () => {
    const csp = header("Content-Security-Policy");

    expect(csp).toContain("script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com");
    expect(csp).toContain("frame-src https://challenges.cloudflare.com");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
  });

  it("no abre conexiones a orígenes arbitrarios", () => {
    // Turnstile solo exige script-src y frame-src (docs de Cloudflare); el
    // connect-src extra únicamente hace falta en modo pre-clearance.
    const csp = header("Content-Security-Policy");

    expect(csp).toContain("connect-src 'self'");
    expect(csp).not.toMatch(/(^|[\s;])https:([\s;]|$)/);
  });

  it("permite eval en desarrollo, que es donde React lo necesita", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const { securityHeaders: headers } = await loadedHeaders();

    expect(header("Content-Security-Policy", headers)).toContain(
      "'unsafe-eval'",
    );
  });

  it("no permite eval en producción", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { securityHeaders: headers } = await loadedHeaders();

    const csp = header("Content-Security-Policy", headers);

    expect(csp).not.toContain("'unsafe-eval'");
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
  });
});
