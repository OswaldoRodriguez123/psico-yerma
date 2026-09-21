"use client";

import { useTransition } from "react";
import { Select } from "@/components/ui/Select";
import { useToast } from "@/components/ui/Toast";
import { updateContactStatusAction } from "@/features/contact/actions";

const options = [
  { value: "new", label: "Nuevo" },
  { value: "contacted", label: "Contactado" },
  { value: "closed", label: "Cerrado" },
];

export function ContactStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  return (
    <Select
      size="sm"
      value={status}
      disabled={isPending}
      aria-label="Estado del contacto"
      wrapperClassName="inline-block"
      onChange={(event) => {
        const next = event.target.value;
        startTransition(async () => {
          const result = await updateContactStatusAction(id, next);
          showToast(
            result.ok ? "Estado actualizado." : "No se pudo cambiar el estado.",
            result.ok ? "success" : "error",
          );
        });
      }}
      className="cursor-pointer rounded-lg border border-border bg-surface py-1 pl-2 text-ink disabled:opacity-60"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
