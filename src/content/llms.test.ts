import { describe, expect, it } from "vitest";
import { renderLlms } from "./llms";
import { site } from "./site";

describe("llms.txt", () => {
  const text = renderLlms();

  it("presenta el sitio y a la profesional", () => {
    expect(text.startsWith(`# ${site.name}`)).toBe(true);
    expect(text).toContain(site.professionalName);
    expect(text).toContain(site.description);
  });

  it("enlaza las páginas públicas desde site.url", () => {
    expect(text).toContain(`- [Inicio](${site.url}/)`);
    expect(text).toContain(`(${site.url}/contacto)`);
    expect(text).toContain(`(${site.url}/faq)`);
  });

  it("no deja URLs absolutas fuera de site.url", () => {
    const urls = text.match(/https?:\/\/[^\s)]+/g) ?? [];

    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      const allowed = url.startsWith(`${site.url}/`) || url === site.instagram;
      expect(allowed, url).toBe(true);
    }
  });

  it("incluye contacto y ubicación desde site", () => {
    expect(text).toContain(site.contact.email);
    expect(text).toContain(site.contact.whatsapp);
    expect(text).toContain(site.contact.location.street);
    expect(text).toContain(site.contact.location.placeName);
  });
});
