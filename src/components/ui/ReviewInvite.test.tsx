import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ReviewInvite } from "./ReviewInvite";

const html = renderToStaticMarkup(<ReviewInvite />);

describe("ReviewInvite", () => {
  it("enlaza a la ficha de Google de la profesional", () => {
    expect(html).toContain("https://www.google.com/maps?cid=14465603749844622233");
    expect(html).toContain("reseña");
  });

  it("abre el enlace en una pestaña nueva sin exponer la actual", () => {
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
