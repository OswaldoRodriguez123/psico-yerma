"use client";

import { useActionState, useEffect } from "react";
import {
  updateClientAction,
  type ClientFormState,
} from "@/features/clients/actions";
import { ClientFields } from "@/features/clients/components/ClientFields";
import { buttonClass } from "@/components/styles";
import type { ClientRow } from "@/features/clients/server/list-clients";

export function ClientEditForm({
  client,
  onSaved,
  onCancel,
}: {
  client: ClientRow;
  onSaved: () => void;
  onCancel: () => void;
}) {
  const [state, formAction, isPending] = useActionState<
    ClientFormState,
    FormData
  >(updateClientAction, undefined);

  useEffect(() => {
    if (state?.success) {
      onSaved();
    }
  }, [state, onSaved]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={client.id} />

      <ClientFields
        errors={state?.fieldErrors ?? {}}
        defaultValues={{
          representativeName: client.representative_name,
          representativePhone: client.representative_phone,
          representativeEmail: client.representative_email ?? "",
          patientName: client.patient_name,
          patientBirthDate: client.patient_birth_date ?? "",
          notes: client.notes ?? "",
        }}
      />

      {state?.error ? (
        <p className="rounded-xl bg-danger-soft px-4 py-3 font-semibold text-danger">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={isPending} className={buttonClass}>
          {isPending ? "Guardando…" : "Guardar cambios"}
        </button>
        <button type="button" onClick={onCancel} className={buttonClass}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
