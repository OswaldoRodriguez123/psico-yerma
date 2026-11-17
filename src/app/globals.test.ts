import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./globals.css", import.meta.url), "utf8");

describe("estilos base", () => {
  it("declara el esquema de color claro para controles y scrollbars nativos", () => {
    expect(css).toMatch(/color-scheme:\s*light/);
  });

  it("equilibra los títulos y evita que una palabra larga desborde", () => {
    expect(css).toContain("text-wrap: balance");
    expect(css).toContain("overflow-wrap: anywhere");
  });

  it("mejora el corte de los párrafos", () => {
    expect(css).toContain("text-wrap: pretty");
  });
});
