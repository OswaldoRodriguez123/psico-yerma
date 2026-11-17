import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Nunito: () => ({ variable: "--font-nunito" }),
}));

import { metadata, viewport } from "./layout";

describe("metadata raíz", () => {
  it("declara la verificación de Google Search Console", () => {
    expect(metadata.verification).toMatchObject({
      google: "qa93kDl6um3XM5iNIgbKoCRwojSjXFcYFz4tJk5MzLU",
    });
  });

  it("activa la escala de texto del sistema operativo", () => {
    expect(metadata.other).toMatchObject({ "text-scale": "scale" });
  });
});

describe("viewport raíz", () => {
  it("declara el esquema de color real del sitio (solo claro)", () => {
    expect(viewport.colorScheme).toBe("light");
  });

  it("pinta la barra del navegador con el color de la marca", () => {
    expect(viewport.themeColor).toBe("#fdfbf7");
  });
});
