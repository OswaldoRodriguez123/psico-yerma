import { contact, site } from "@/content/site";
import { cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";

export function ReviewInvite() {
  return (
    <section className={cardClass}>
      <h2 className={cardTitleClass}>{contact.reviewTitle}</h2>
      <p className={`mt-2 ${cardBodyClass}`}>{contact.reviewNote}</p>
      <a
        href={site.googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-semibold text-ink underline underline-offset-4 transition-colors hover:text-ink-soft"
      >
        {contact.reviewCta}
      </a>
    </section>
  );
}
