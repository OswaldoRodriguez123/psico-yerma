import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

const html = renderToStaticMarkup(<ContactPage />);

describe("página de contacto", () => {
  it("muestra el formulario de contacto", () => {
    expect(html).toContain("Envíame un mensaje");
  });

  it("deja que el correo se parta en vez de desbordar la tarjeta", () => {
    expect(html).toContain("min-w-0");
    expect(html).toContain("break-words");
  });
});