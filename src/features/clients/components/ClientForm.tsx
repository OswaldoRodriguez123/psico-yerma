"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import {
  createClientAction,
  type ClientFormState,
} from "@/features/clients/actions";
import { buttonClass, fieldClass } from "@/components/styles";

export function ClientForm() {
  const [state, formAction, isPending] = useActionState<
    ClientFormState,
    FormData
  >(createClientAction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const errors = state?.fieldErrors ?? {};

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="font-bold text-ink">Representante</legend>

        <Field id="representativeName" label="Nombre" error={errors.representativeName}>
          <input
            id="representativeName"
            name="representativeName"
            type="text"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.representativeName)}
            aria-describedby={
              errors.representativeName ? "representativeName-error" : undefined
            }
            className={`mt-1 ${fieldClass(Boolean(errors.representativeName))}`}
          />
        </Field>

        <Field id="representativePhone" label="Teléfono" error={errors.representativePhone}>
          <input
            id="representativePhone"
            name="representativePhone"
            type="tel"
            required
            maxLength={30}
            placeholder="+56 9 1234 5678"
            aria-invalid={Boolean(errors.representativePhone)}
            aria-describedby={
              errors.representativePhone ? "representativePhone-error" : undefined
            }
            className={`mt-1 ${fieldClass(Boolean(errors.representativePhone))}`}
          />
        </Field>

        <Field
          id="representativeEmail"
          label="Correo (opcional)"
          error={errors.representativeEmail}
        >
          <input
            id="representativeEmail"
            name="representativeEmail"
            type="email"
            maxLength={200}
            autoComplete="email"
            aria-invalid={Boolean(errors.representativeEmail)}
            aria-describedby={
              errors.representativeEmail ? "representativeEmail-error" : undefined
            }
            className={`mt-1 ${fieldClass(Boolean(errors.representativeEmail))}`}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-bold text-ink">Paciente</legend>

        <Field id="patientName" label="Nombre" error={errors.patientName}>
          <input
            id="patientName"
            name="patientName"
            type="text"
            required
            maxLength={100}
            aria-invalid={Boolean(errors.patientName)}
            aria-describedby={errors.patientName ? "patientName-error" : undefined}
            className={`mt-1 ${fieldClass(Boolean(errors.patientName))}`}
          />
        </Field>

        <Field
          id="patientBirthDate"
          label="Fecha de nacimiento (opcional)"
          error={errors.patientBirthDate}
        >
          <input
            id="patientBirthDate"
            name="patientBirthDate"
            type="date"
            aria-invalid={Boolean(errors.patientBirthDate)}
            aria-describedby={
              errors.patientBirthDate ? "patientBirthDate-error" : undefined
            }
            className={`mt-1 ${fieldClass(Boolean(errors.patientBirthDate))}`}
          />
        </Field>

        <Field id="notes" label="Notas (opcional)" error={errors.notes}>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            maxLength={1000}
            aria-invalid={Boolean(errors.notes)}
            aria-describedby={errors.notes ? "notes-error" : undefined}
            className={`mt-1 ${fieldClass(Boolean(errors.notes))}`}
          />
        </Field>
      </fieldset>

      {state?.error ? (
        <p className="rounded-xl bg-danger-soft px-4 py-3 font-semibold text-danger">
          {state.error}
        </p>
      ) : null}

      {state?.success ? (
        <p className="rounded-xl bg-success-soft px-4 py-3 text-ink">
          Cliente guardado.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className={buttonClass}
      >
        {isPending ? "Guardando…" : "Guardar cliente"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
