export function PageIntro({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
      <h1 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      {intro ? <p className="mt-4 text-lg text-ink-soft">{intro}</p> : null}
    </header>
  );
}
