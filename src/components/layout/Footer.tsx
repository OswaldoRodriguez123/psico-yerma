import type { ComponentType } from "react";
import { contact, site } from "@/content/site";
import { getMailtoHref, getWhatsappHref } from "@/features/contact/links";
import { InstagramIcon, MailIcon, StarIcon, WhatsAppIcon } from "@/components/ui/icons";

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
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-primary-soft">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <p className="hidden text-sm text-ink-soft sm:block">
          © {new Date().getFullYear()} {site.professionalName} — {site.tagline}
        </p>

        <ul className="flex w-full items-stretch justify-around sm:w-auto sm:items-center sm:justify-end sm:gap-3">
          {links.map(({ key, href, label, ariaLabel, title, Icon, external }) => (
            <li key={key} className="flex-1 sm:flex-none">
              <a
                href={href}
                aria-label={ariaLabel ?? label}
                title={title ?? ariaLabel ?? label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative flex h-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink-soft transition-colors hover:text-ink sm:h-10 sm:w-10 sm:gap-0 sm:rounded-full sm:bg-surface sm:text-ink sm:hover:bg-primary"
              >
                <Icon className="h-5 w-5" />
                <span className="sm:hidden">{label}</span>
                <span
                  role="tooltip"
                  className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-xs font-medium text-surface opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {ariaLabel ?? label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
