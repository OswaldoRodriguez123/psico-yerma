import type { Metadata } from "next";
import { faq } from "@/content/site";
import { PageIntro } from "@/components/ui/PageIntro";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: faq.intro,
};

export default function FaqPage() {
  return (
    <>
      <PageIntro title={faq.title} intro={faq.intro} />

      <section className="mx-auto max-w-3xl space-y-3 px-6 pb-12">
        {faq.items.map((item) => (
          <details
            key={item.question}
            className={`group ${cardClass} transition-colors hover:border-primary`}
          >
            <summary
              className={`flex cursor-pointer list-none items-center justify-between gap-4 ${cardTitleClass} [&::-webkit-details-marker]:hidden`}
            >
              {item.question}
              <ChevronDownIcon className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-open:rotate-180" />
            </summary>
            <p className={`mt-3 ${cardBodyClass}`}>{item.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
