import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ServicesPage from "./page";

const html = renderToStaticMarkup(<ServicesPage />);

describe("página de servicios", () => {
  it("publica el precio de la consulta", () => {
    expect(html).toContain("Consulta");
    expect(html).toContain("$40.000");
  });

  it("no inventa precios para los demás servicios", () => {
    expect(html.match(/\$40\.000/g)).toHaveLength(1);
  });
});
