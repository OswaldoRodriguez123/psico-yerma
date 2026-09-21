import type { ComponentType } from "react";
import { site } from "@/content/site";
import { getMailtoHref, getWhatsappHref } from "@/features/contact/links";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "@/components/ui/icons";

type FooterLink = {
  key: string;
  href: string;
  label: string;
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

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-primary-soft">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <p className="hidden text-sm text-ink-soft sm:block">
          © {new Date().getFullYear()} {site.professionalName} — {site.tagline}
        </p>

        <ul className="flex w-full items-stretch justify-around sm:w-auto sm:items-center sm:justify-end sm:gap-3">
          {links.map(({ key, href, label, Icon, external }) => (
            <li key={key} className="flex-1 sm:flex-none">
              <a
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-full flex-col items-center justify-center gap-0.5 text-xs font-semibold text-ink-soft transition-colors hover:text-ink sm:h-10 sm:w-10 sm:gap-0 sm:rounded-full sm:bg-surface sm:text-ink sm:hover:bg-primary"
              >
                <Icon className="h-5 w-5" />
                <span className="sm:hidden">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
