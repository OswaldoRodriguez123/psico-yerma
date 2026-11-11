import { describe, expect, it } from "vitest";
import { about, faq, services, site } from "@/content/site";
import {
  breadcrumbJsonLd,
  contactPageJsonLd,
  faqJsonLd,
  medicalBusinessJsonLd,
  personJsonLd,
  servicesJsonLd,
  websiteJsonLd,
} from "./structured-data";

describe("structured data", () => {
  it("declara el sitio con su URL e idioma", () => {
    expect(websiteJsonLd()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.url,
      inLanguage: "es-CL",
    });
  });

  it("describe a la profesional sin inventar dirección ni teléfono", () => {
    const person = personJsonLd();

    expect(person).toMatchObject({
      "@type": "Person",
      name: site.professionalName,
      url: site.url,
    });
    expect(person.sameAs).toEqual([site.instagram]);
    expect(person).not.toHaveProperty("address");
    expect(person).not.toHaveProperty("telephone");
  });

  it("marca cada servicio con su nombre y descripción reales", () => {
    const list = servicesJsonLd();

    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement).toHaveLength(services.items.length);
    expect(list.itemListElement[0]).toMatchObject({
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: services.items[0].title,
        description: services.items[0].description,
      },
    });
  });

  it("publica la FAQ con las mismas preguntas que la página", () => {
    const page = faqJsonLd();

    expect(page["@type"]).toBe("FAQPage");
    expect(page.mainEntity).toHaveLength(faq.items.length);
    expect(page.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: faq.items[0].question,
      acceptedAnswer: { "@type": "Answer", text: faq.items[0].answer },
    });
  });

  it("construye migas absolutas desde la raíz", () => {
    const crumbs = breadcrumbJsonLd("/servicios", services.title);

    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${site.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: services.title,
        item: `${site.url}/servicios`,
      },
    ]);
  });

  it("declara la página de contacto", () => {
    expect(contactPageJsonLd()).toMatchObject({
      "@type": "ContactPage",
      url: `${site.url}/contacto`,
    });
  });

  it("usa la descripción de la profesional como texto del schema", () => {
    expect(personJsonLd().description).toBe(about.description);
  });

  it("declara el consultorio con dirección, teléfono y horario presencial", () => {
    const business = medicalBusinessJsonLd();

    expect(business["@type"]).toBe("MedicalBusiness");
    expect(business.telephone).toBe(site.contact.whatsapp);
    expect(business.address).toEqual({
      "@type": "PostalAddress",
      streetAddress: "Av. Pedro de Valdivia 1860",
      addressLocality: "Providencia",
      addressRegion: "Región Metropolitana",
      postalCode: "7500000",
      addressCountry: "CL",
    });
    expect(business.openingHoursSpecification).toEqual([
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday"],
        opens: "14:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "14:00",
      },
    ]);
  });

  it("publica el precio de la consulta como rango de precio", () => {
    expect(medicalBusinessJsonLd().priceRange).toBe("$40.000");
  });

  it("no mezcla el espacio arrendado como si fuera el negocio", () => {    const business = medicalBusinessJsonLd();

    expect(business.name).toBe(site.name);
    expect(business).not.toHaveProperty("containedInPlace");
    expect(JSON.stringify(business)).not.toContain("Espacio Descubrirte");
  });
});
