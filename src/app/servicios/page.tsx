import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/content/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { buttonClass, cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";

export const metadata: Metadata = {
  title: "Servicios",
  description: services.intro,
};

export default function ServicesPage() {
  return (
    <>
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
