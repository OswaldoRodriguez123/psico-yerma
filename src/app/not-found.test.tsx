import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

const html = renderToStaticMarkup(<NotFound />);

describe("página 404", () => {
  it("está escrita en español", () => {
    expect(html).toContain("Esta página no existe");
    expect(html).not.toContain("This page could not be found");
  });

  it("ofrece volver al inicio", () => {
    expect(html).toContain('href="/"');
  });
});
