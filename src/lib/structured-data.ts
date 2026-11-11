import { about, contact, faq, services, site } from "@/content/site";

const CONTEXT = "https://schema.org";

/**
 * JSON-LD del sitio. Solo datos que existen en `src/content/site.ts`: nada de
 * dirección, teléfono ni perfiles inventados.
 */
export function websiteJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "es-CL",
  };
}

export function personJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "Person",
    name: site.professionalName,
    jobTitle: "Psicóloga infantil y adolescente",
    description: about.description,
    url: site.url,
    email: site.contact.email,
    sameAs: [site.instagram],
    knowsAbout: [...about.additionalFormation],
  };
}

export function breadcrumbJsonLd(path: string, label: string) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: `${site.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${site.url}${path}`,
      },
    ],
  };
}

export function servicesJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name: services.title,
    itemListElement: services.items.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Person",
          name: site.professionalName,
          url: site.url,
        },
      },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": CONTEXT,
    "@type": "ContactPage",
    name: contact.title,
    url: `${site.url}/contacto`,
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
  };
}
