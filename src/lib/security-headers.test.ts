import { describe, expect, it } from "vitest";
import { securityHeaders } from "./security-headers";

function header(name: string): string {
  const match = securityHeaders.find(
    (entry) => entry.key.toLowerCase() === name.toLowerCase(),
  );
  return match?.value ?? "";
}

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

  it("no abre conexiones ni imágenes a orígenes arbitrarios", () => {
    const csp = header("Content-Security-Policy");

    expect(csp).toContain("connect-src 'self'");
    expect(csp).not.toMatch(/(^|[\s;])https:([\s;]|$)/);
  });
});
