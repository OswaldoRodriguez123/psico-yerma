import { contact, site } from "@/content/site";

export function getWhatsappHref(): string | null {
  if (!site.contact.whatsapp) {
    return null;
  }

  const digits = site.contact.whatsapp.replace(/\D/g, "");

  return `https://wa.me/${digits}?text=${encodeURIComponent(contact.whatsappMessage)}`;
}

export function getMailtoHref(): string | null {
  if (!site.contact.email) {
    return null;
  }

  return `mailto:${site.contact.email}?subject=${encodeURIComponent(
    contact.emailSubject,
  )}&body=${encodeURIComponent(contact.emailBody)}`;
}
