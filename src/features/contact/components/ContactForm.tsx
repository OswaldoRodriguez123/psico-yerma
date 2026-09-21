"use client";

import { useCallback, useState, type FormEvent } from "react";
import { contactForm } from "@/content/site";
import { contactSchema } from "@/features/contact/schema";
import { TurnstileWidget } from "@/features/contact/components/TurnstileWidget";
import { buttonClass } from "@/components/styles";
import { ChevronDownIcon } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder = ["name", "email", "phone", "reason", "message"];

function readPayload(form: HTMLFormElement) {
  const data = new FormData(form);

  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    reason: String(data.get("reason") ?? ""),
    message: String(data.get("message") ?? ""),
    company: String(data.get("company") ?? ""),
  };
}

function validate(payload: unknown) {
  const result = contactSchema.safeParse(payload);

  if (result.success) {
    return {};
  }

  const fieldErrors: Record<string, string> = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0];

    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}

function focusFirstError(fieldErrors: Record<string, string>) {
  const firstField = fieldOrder.find((field) => fieldErrors[field]);

  if (!firstField) {
    return;
  }

  const element = document.getElementById(firstField);

  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function ContactForm({
  turnstileSiteKey,
}: {
  turnstileSiteKey?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  function resetTurnstile() {
    setTurnstileToken("");
    setTurnstileKey((key) => key + 1);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const payload = { ...readPayload(form), turnstileToken };

    setHasSubmitted(true);

    const clientErrors = validate(payload);

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus("error");
      setNotice(contactForm.fixErrorsMessage);
      focusFirstError(clientErrors);
      return;
    }

    setErrors({});
    setNotice("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const serverErrors: Record<string, string> = result?.fieldErrors ?? {};

        setErrors(serverErrors);
        setStatus("error");
        setNotice(result?.error ?? contactForm.errorMessage);
        focusFirstError(serverErrors);
        resetTurnstile();
        return;
      }

      form.reset();
      setHasSubmitted(false);
      setStatus("success");
    } catch {
      setStatus("error");
      setNotice(contactForm.errorMessage);
      resetTurnstile();
    }
  }

  function handleChange(event: FormEvent<HTMLFormElement>) {
    if (!hasSubmitted) {
      return;
    }

    const nextErrors = validate(
      readPayload(event.currentTarget),
    );

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setStatus("idle");
      setNotice("");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-success-soft p-6 text-center">
        <p className="text-xl font-bold text-ink">{contactForm.successTitle}</p>
        <p className="mt-2 text-ink-soft">{contactForm.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-5 ${buttonClass}`}
        >
          {contactForm.sendAnother}
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} onChange={handleChange} noValidate className="space-y-5">
      <p className="text-sm text-ink-soft">{contactForm.contactHint}</p>

      <div
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company">No completar este campo</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block font-semibold text-ink">
          {contactForm.nameLabel}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`mt-1 ${fieldClass(Boolean(errors.name))}`}
        />
        <FieldError id="name-error" message={errors.name} />
      </div>

      <div>
        <label htmlFor="email" className="block font-semibold text-ink">
          {contactForm.emailLabel}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          maxLength={200}
          autoComplete="email"
          autoCapitalize="none"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`mt-1 ${fieldClass(Boolean(errors.email))}`}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      <div>
        <label htmlFor="phone" className="block font-semibold text-ink">
          {contactForm.phoneLabel}
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          maxLength={30}
          autoComplete="tel"
          placeholder="+56 9 1234 5678"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={`mt-1 ${fieldClass(Boolean(errors.phone))}`}
        />
        <FieldError id="phone-error" message={errors.phone} />
      </div>

      <div>
        <label htmlFor="reason" className="block font-semibold text-ink">
          {contactForm.reasonLabel}
        </label>
        <div className="relative mt-1">
          <select
            id="reason"
            name="reason"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.reason)}
            aria-describedby={errors.reason ? "reason-error" : undefined}
            className={`${fieldClass(Boolean(errors.reason))} appearance-none pr-10`}
          >
            <option value="" disabled>
              {contactForm.reasonPlaceholder}
            </option>
            {contactForm.reasons.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-ink-soft" />
        </div>
        <FieldError id="reason-error" message={errors.reason} />
      </div>

      <div>
        <label htmlFor="message" className="block font-semibold text-ink">
          {contactForm.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={10}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={`mt-1 ${fieldClass(Boolean(errors.message))}`}
        />
        {errors.message ? (
          <FieldError id="message-error" message={errors.message} />
        ) : (
          <p id="message-hint" className="mt-1 text-sm text-ink-soft">
            {contactForm.messageHint}
          </p>
        )}
      </div>

      {turnstileSiteKey ? (
        <div>
          <TurnstileWidget
            key={turnstileKey}
            siteKey={turnstileSiteKey}
            onToken={handleTurnstileToken}
          />
          <FieldError id="turnstile-error" message={errors.turnstileToken} />
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full ${buttonClass} disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
      >
        {isSubmitting ? contactForm.submitting : contactForm.submit}
      </button>

      <p
        role="alert"
        className={
          status === "error"
            ? "rounded-xl bg-danger-soft px-4 py-3 font-semibold text-danger"
            : "sr-only"
        }
      >
        {notice}
      </p>
    </form>
  );
}

function fieldClass(hasError: boolean) {
  return `w-full rounded-xl border bg-surface px-4 py-2.5 text-ink outline-none focus:border-primary ${
    hasError ? "border-danger" : "border-border"
  }`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-1 text-sm font-semibold text-danger">
      {message}
    </p>
  );
}
