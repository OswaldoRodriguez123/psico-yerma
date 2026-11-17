import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import AboutPage, { metadata } from "./page";

describe("metadata de /sobre-mi", () => {
  it("mantiene la description dentro de los 160 caracteres", () => {
    expect(String(metadata.description).length).toBeLessThanOrEqual(160);
  });

  it("declara un canonical autorreferente", () => {
    expect(metadata.alternates?.canonical).toBe("/sobre-mi");
  });
});

describe("retrato de /sobre-mi", () => {
  const html = renderToStaticMarkup(<AboutPage />);

  it("no deja que la columna del retrato crezca más que la pantalla", () => {
    expect(html).toContain("max-w-52");
    expect(html).toContain("sm:max-w-none");
  });

  it("le dice al navegador el tamaño real que ocupa la imagen", () => {
    expect(html).toContain("min(13rem, calc(100vw - 3rem))");
  });
});
