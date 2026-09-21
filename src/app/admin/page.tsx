import Link from "next/link";
import { cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";

const sections = [
  {
    href: "/admin/contactos",
    title: "Contactos",
    description: "Mensajes que llegaron desde el formulario del sitio.",
  },
  {
    href: "/admin/clientes",
    title: "Clientes",
    description: "Registro de clientes y sus datos de contacto.",
  },
];

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Panel</h1>
      <p className="mt-2 text-ink-soft">
        Bienvenida. Desde aquí puedes gestionar contactos y clientes.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`${cardClass} transition-colors hover:border-primary`}
          >
            <h2 className={cardTitleClass}>{section.title}</h2>
            <p className={`mt-2 ${cardBodyClass}`}>{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
