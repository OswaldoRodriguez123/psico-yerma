import { site } from "@/content/site";
import { cardBodyClass, cardClass, cardTitleClass } from "@/components/styles";

export function ContactDetails() {
  const { location, hours } = site.contact;

  return (
    <section className={cardClass}>
      <h2 className={cardTitleClass}>Dónde y cuándo</h2>
      <p className={`mt-2 ${cardBodyClass}`}>
        {location.street}, {location.commune}
        <br />
        {location.placeName}
      </p>
      <p className="mt-1 text-sm text-ink-soft">{location.reference}</p>

      <ul className="mt-4 space-y-1 text-ink-soft">
        {hours.inPerson.map((slot) => (
          <li key={slot.label}>
            {slot.label}: {slot.opens}–{slot.closes} (presencial)
          </li>
        ))}
      </ul>
      <p className="mt-2 text-ink-soft">{hours.online}</p>
    </section>
  );
}
