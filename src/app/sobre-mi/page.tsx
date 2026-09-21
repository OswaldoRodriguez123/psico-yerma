import type { Metadata } from "next";
import Image from "next/image";
import { about, site } from "@/content/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: about.title,
  description: about.description,
  path: "/sobre-mi",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro title={about.title} intro={about.intro} />

      <section className="mx-auto grid max-w-4xl gap-8 px-6 pb-10 sm:grid-cols-[240px_1fr]">
        <div className="relative mx-auto aspect-[3/4] w-52 overflow-hidden rounded-2xl sm:w-full">
          <Image
            src="/images/retrato.jpg"
            alt={site.professionalName}
            fill
            priority
            sizes="(min-width: 640px) 240px, 208px"
            className="object-cover"
          />
        </div>

        <div className="space-y-4">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-6 pb-12">
        <div className={cardClass}>
          <h2 className={cardTitleClass}>{about.formationTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {about.studies.map((item) => (
              <li key={item} className={cardBodyClass}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <h2 className={cardTitleClass}>{about.additionalFormationTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            {about.additionalFormation.map((item) => (
              <li key={item} className={cardBodyClass}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
