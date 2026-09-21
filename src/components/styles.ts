export const buttonClass =
  "cursor-pointer rounded-full border border-primary bg-primary-soft px-6 py-3 font-semibold text-ink-soft transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60";

export const dangerButtonClass =
  "cursor-pointer rounded-full border border-danger bg-danger-soft px-6 py-3 font-semibold text-danger transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60";

export const cardClass =
  "rounded-2xl border border-border bg-surface p-6";

export const cardTitleClass = "text-lg font-bold text-ink";

export const cardBodyClass = "text-ink-soft";

export const actionCardClass = `${cardClass} flex items-center gap-4 transition-colors hover:border-primary`;

export function fieldClass(hasError: boolean) {
  return `w-full rounded-xl border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary ${
    hasError ? "border-danger" : "border-border"
  }`;
}
