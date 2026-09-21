import Link from "next/link";
import { home, site } from "@/content/site";
import { Logo } from "@/components/layout/Logo";
import { buttonClass, cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";

export default function HomePage() {
  return (
    <>
      <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 pb-12 text-center">
        <Logo className="h-28 w-auto" />
        <p className="mt-6 text-sm font-semibold tracking-widest text-ink-soft uppercase">
          {site.tagline}
        </p>
        <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
          {home.title}
        </h1>
        <p className="mt-3 font-semibold text-ink">{site.professionalName}</p>
        <p className="mt-6 text-lg text-ink-soft">{home.intro}</p>
        <Link href="/contacto" className={`mt-8 ${buttonClass}`}>
          {home.cta}
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-12">
        <ul className="grid gap-6 sm:grid-cols-3">
          {home.highlights.map((item) => (
            <li key={item.title} className={cardClass}>
              <h2 className={cardTitleClass}>{item.title}</h2>
              <p className={`mt-2 ${cardBodyClass}`}>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
