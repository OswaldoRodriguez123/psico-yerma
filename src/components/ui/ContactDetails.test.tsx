import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactDetails } from "./ContactDetails";

const html = renderToStaticMarkup(<ContactDetails />);

describe("ContactDetails", () => {
  it("publica la dirección y la referencia de metro", () => {
    expect(html).toContain("Av. Pedro de Valdivia 1860");
    expect(html).toContain("Providencia");
    expect(html).toContain("Metro Pedro de Valdivia");
  });

  it("publica los horarios presenciales y la modalidad online", () => {
    expect(html).toContain("Viernes");
    expect(html).toContain("14:00");
    expect(html).toContain("19:00");
    expect(html).toContain("Sábado");
    expect(html).toContain("09:00");
    expect(html).toContain("14:00");
    expect(html).toContain("cita");
  });
});
