import type { Metadata } from "next";
import { contact, contactForm, site } from "@/content/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { getMailtoHref, getWhatsappHref } from "@/features/contact/links";
import {
  actionCardClass,
  cardBodyClass,
  cardClass,
  cardTitleClass,
} from "@/components/styles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: contact.title,
  description: contact.intro,
  path: "/contacto",
});

export default function ContactPage() {
  const { whatsapp, email, location } = site.contact;
  const whatsappHref = getWhatsappHref();
  const mailtoHref = getMailtoHref();
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY;

  return (
    <>
      <PageIntro title={contact.title} intro={contact.intro} />

      <section className="mx-auto max-w-3xl space-y-4 px-6 pb-12">
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={actionCardClass}
          >
            <WhatsAppIcon className="h-8 w-8 shrink-0 text-ink" />
            <span>
              <span className="block font-bold text-ink">
                {contact.whatsappCta}
              </span>
              <span className="block text-sm text-ink-soft">{whatsapp}</span>
            </span>
          </a>
        ) : null}

        {mailtoHref ? (
          <a
            href={mailtoHref}
            className={actionCardClass}
          >
            <MailIcon className="h-8 w-8 shrink-0 text-ink" />
            <span>
              <span className="block font-bold text-ink">
                {contact.emailCta}
              </span>
              <span className="block text-sm text-ink-soft">{email}</span>
            </span>
          </a>
        ) : null}

        {location ? (
          <div className={cardClass}>
            <p className={cardTitleClass}>Ubicación</p>
            <p className={`mt-2 ${cardBodyClass}`}>{location}</p>
          </div>
        ) : null}

        <p className="pt-4 text-sm text-ink-soft">{contact.privacyNote}</p>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>{contactForm.title}</h2>
          <div className="mt-5">
            <ContactForm turnstileSiteKey={turnstileSiteKey} />
          </div>
        </div>
      </section>
    </>
  );
}
