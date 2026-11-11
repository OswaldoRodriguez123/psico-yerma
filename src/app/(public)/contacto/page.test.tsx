import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

const html = renderToStaticMarkup(<ContactPage />);

describe("página de contacto", () => {
  it("muestra el formulario de contacto", () => {
    expect(html).toContain("Envíame un mensaje");
  });
});