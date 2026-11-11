import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ReviewInvite } from "./ReviewInvite";

const html = renderToStaticMarkup(<ReviewInvite />);

describe("ReviewInvite", () => {
  it("enlaza a la ficha de Google de la profesional", () => {
    expect(html).toContain("https://g.page/r/CZkbDOv3JcDIEBM/review");
    expect(html).toContain("reseña");
  });

  it("abre el enlace en una pestaña nueva sin exponer la actual", () => {
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
