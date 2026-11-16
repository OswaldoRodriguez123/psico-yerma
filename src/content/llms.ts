import { site } from "./site";

/*
 * Contenido de /llms.txt.
 *
 * Se arma desde `site` para que el dominio (site.url) y los datos de contacto
 * vivan en un solo lugar: si cambia el dominio, este archivo se actualiza solo.
 */

type LlmsPage = {
  path: string;
  label: string;
  description: string;
};

const pages: LlmsPage[] = [
  {
    path: "/",
    label: "Inicio",
    description: "presentación del espacio de acompañamiento.",
  },
  {
    path: "/sobre-mi",
    label: "Sobre mí",
    description: "formación y enfoque de trabajo.",
  },
  {
    path: "/servicios",
    label: "Servicios",
    description:
      "evaluación psicológica infantil, acompañamiento psicoterapéutico, orientación a familias y talleres.",
  },
  {
    path: "/faq",
    label: "Preguntas frecuentes",
    description:
      "edad de atención, primera sesión, duración, participación de las familias y cómo agendar.",
  },
  {
    path: "/contacto",
    label: "Contacto",
    description: "formulario, WhatsApp y correo.",
  },
];

export function renderLlms(): string {
  const { email, whatsapp, location, hours } = site.contact;
  const url = (path: string) => `${site.url}${path}`;
  const address =
    `${location.street}, ${location.commune}, ${location.city} ` +
    `(dentro de ${location.placeName}), ` +
    `${location.reference.charAt(0).toLowerCase()}${location.reference.slice(1)}`;
  const inPerson = hours.inPerson
    .map((slot) => `${slot.label.toLowerCase()} de ${slot.opens} a ${slot.closes}`)
    .join(" y ");

  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Sitio de ${site.professionalName}, psicóloga infantil y adolescente.`,
    "Formación en desarrollo infantil, WISC V, TEA y TDAH.",
    "",
    "## Páginas",
    "",
    ...pages.map(
      (page) => `- [${page.label}](${url(page.path)}): ${page.description}`,
    ),
    "",
    "## Contacto",
    "",
    `- Correo: ${email}`,
    `- WhatsApp: ${whatsapp}`,
    `- Instagram: ${site.instagram}`,
    "",
    "## Dónde y cuándo",
    "",
    `- Dirección: ${address}.`,
    `- Presencial: ${inPerson}.`,
    `- Online: ${hours.online.toLowerCase()}.`,
    "",
  ].join("\n");
}
