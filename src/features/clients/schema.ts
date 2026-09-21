import { z } from "zod";
import { parsePhone } from "@/lib/phone";

const name = (label: string) =>
  z
    .string({ error: `Escribe el nombre del ${label}.` })
    .trim()
    .min(2, `Escribe el nombre del ${label}.`)
    .max(100, "Máximo 100 caracteres.")
    .regex(/^[\p{L}\s'.-]+$/u, "Ingresa un nombre válido.");

export const clientSchema = z.object({
  representativeName: name("representante"),
  representativePhone: z
    .string({ error: "Ingresa un teléfono válido." })
    .trim()
    .min(1, "Ingresa un teléfono válido.")
    .refine(
      (value) => parsePhone(value) !== null,
      "Ingresa un teléfono válido (solo números).",
    )
    .transform((value) => parsePhone(value) ?? value),
  representativeEmail: z
    .string()
    .trim()
    .toLowerCase()
    .max(200, "Máximo 200 caracteres.")
    .optional()
    .refine(
      (value) => !value || z.email().safeParse(value).success,
      "Ingresa un correo válido.",
    )
    .transform((value) => (value ? value : null)),
  patientName: name("paciente"),
  patientBirthDate: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value),
      "Ingresa una fecha válida.",
    )
    .transform((value) => (value ? value : null)),
  notes: z
    .string()
    .trim()
    .max(1000, "Máximo 1000 caracteres.")
    .optional()
    .transform((value) => (value ? value : null)),
});

export type ClientInput = z.infer<typeof clientSchema>;
