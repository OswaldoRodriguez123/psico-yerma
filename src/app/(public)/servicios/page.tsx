import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/structured-data";
import { formatClp } from "@/lib/format";
import { buttonClass, cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: services.title,
  description: services.intro,
  path: "/servicios",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[servicesJsonLd(), breadcrumbJsonLd("/servicios", services.title)]} />
      <PageIntro title={services.title} intro={services.intro} />

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.items.map((service) => (
            <li
              key={service.title}
              className={cardClass}
            >
              <h2 className={cardTitleClass}>{service.title}</h2>
              <p className={`mt-2 ${cardBodyClass}`}>{service.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-ink-soft uppercase">
            {services.consultation.label}
          </p>
          <p className="mt-2 text-3xl font-bold text-ink">
            {formatClp(services.consultation.price)}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            {services.consultation.note}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contacto"
            className={`inline-block ${buttonClass}`}
          >
            Consultar disponibilidad
          </Link>
        </div>
      </section>
    </>
  );
}
