import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

const html = renderToStaticMarkup(<Footer />);

describe("footer", () => {
  it("no dibuja tooltips propios: usa el title nativo del enlace", () => {
    expect(html).not.toContain('role="tooltip"');
    expect(html).toContain("title=");
  });

  it("escala las etiquetas con el tamaño de texto del navegador", () => {
    expect(html).not.toMatch(/text-\[10px\]/);
    expect(html).toContain("text-[0.625rem]");
  });

  it("solo se fija al borde inferior desde tablet", () => {
    expect(html).toContain("sm:fixed");
    expect(html).not.toMatch(/class="fixed inset-x-0/);
  });
});
