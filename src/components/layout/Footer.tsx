import type { ComponentType } from "react";
import { contact, site } from "@/content/site";
import { getMailtoHref, getWhatsappHref } from "@/features/contact/links";
import { InstagramIcon, LinkedInIcon, MailIcon, StarIcon, WhatsAppIcon } from "@/components/ui/icons";

type FooterLink = {
  key: string;
  href: string;
  label: string;
  ariaLabel?: string;
  title?: string;
  Icon: ComponentType<{ className?: string }>;
  external: boolean;
};

export function Footer() {
  const whatsappHref = getWhatsappHref();
  const mailtoHref = getMailtoHref();

  const links: FooterLink[] = [
    {
      key: "instagram",
      href: site.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
      external: true,
    },
    {
      key: "linkedin",
      href: site.linkedin,
      label: "LinkedIn",
      Icon: LinkedInIcon,
      external: true,
    },
  ];

  if (whatsappHref) {
    links.push({
      key: "whatsapp",
      href: whatsappHref,
      label: "WhatsApp",
      Icon: WhatsAppIcon,
      external: true,
    });
  }

  if (mailtoHref) {
    links.push({
      key: "mailto",
      href: mailtoHref,
      label: "Correo",
      Icon: MailIcon,
      external: false,
    });
  }

  if (site.googleReviewUrl) {
    links.push({
      key: "review",
      href: site.googleReviewUrl,
      label: "Reseña",
      ariaLabel: contact.reviewCta,
      title: `${contact.reviewCta}. ${contact.reviewNote}`,
      Icon: StarIcon,
      external: true,
    });
  }

  return (
    <footer className="z-40 border-t border-border bg-primary-soft sm:fixed sm:inset-x-0 sm:bottom-0">
      <div className="mx-auto flex min-h-16 max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 py-2 sm:h-16 sm:flex-nowrap sm:py-0">
        <p className="hidden text-sm text-ink-soft sm:block">
          © {new Date().getFullYear()} {site.professionalName} — {site.tagline}
        </p>

        <ul className="flex w-full flex-wrap items-stretch justify-between gap-2 sm:w-auto sm:items-center sm:justify-end sm:gap-3">
          {links.map(({ key, href, label, ariaLabel, title, Icon, external }) => (
            <li key={key} className="flex-none">
              <a
                href={href}
                aria-label={ariaLabel ?? label}
                title={title ?? ariaLabel ?? label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink-soft transition-colors hover:text-ink sm:h-10 sm:w-10 sm:gap-0 sm:rounded-full sm:bg-surface sm:text-ink sm:hover:bg-primary"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[0.625rem] leading-none min-[380px]:text-xs min-[380px]:leading-normal sm:hidden">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
