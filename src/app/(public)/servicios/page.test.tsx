import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ServicesPage from "./page";

const html = renderToStaticMarkup(<ServicesPage />);

describe("página de servicios", () => {
  it("no publica el precio de la consulta", () => {
    expect(html).not.toContain("$40.000");
    expect(html).not.toMatch(/\$\s?\d/);
  });

  it("no muestra la nota del valor de la sesión", () => {
    expect(html).not.toContain("Valor de la sesión de consulta");
  });
});
