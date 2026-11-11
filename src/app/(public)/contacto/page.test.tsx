import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ContactPage from "./page";

const html = renderToStaticMarkup(<ContactPage />);

describe("página de contacto", () => {
  it("invita a dejar una reseña en Google", () => {
    expect(html).toContain("Déjanos una reseña en Google");
    expect(html).toContain("https://www.google.com/maps?cid=14465603749844622233");
  });
});
