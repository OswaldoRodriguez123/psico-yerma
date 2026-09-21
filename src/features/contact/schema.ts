import { z } from "zod";

export const contactReasons = [
  "consulta",
  "evaluacion",
  "acompanamiento",
  "talleres",
  "otro",
] as const;

export function parsePhone(input: string): string | null {
  const cleaned = input.replace(/[\s.()-]/g, "");

  return /^\+?\d{7,15}$/.test(cleaned) ? cleaned : null;
}

export const contactSchema = z
  .object({
    name: z
      .string({ error: "Escribe tu nombre." })
      .trim()
      .min(2, "Escribe tu nombre.")
      .max(100, "Máximo 100 caracteres.")
      .regex(/^[\p{L}\s'.-]+$/u, "Ingresa un nombre válido."),
    email: z
      .string({ error: "Ingresa un correo válido." })
      .trim()
      .toLowerCase()
      .max(200, "Máximo 200 caracteres.")
      .optional()
      .refine(
        (value) => !value || z.email().safeParse(value).success,
        "Ingresa un correo válido.",
      )
      .transform((value) => (value ? value : null)),
    phone: z
      .string({ error: "Ingresa un teléfono válido." })
      .trim()
      .max(30, "Máximo 30 caracteres.")
      .optional()
      .refine(
        (value) => !value || parsePhone(value) !== null,
        "Ingresa un teléfono válido (solo números).",
      )
      .transform((value) => (value ? parsePhone(value) : null)),
    reason: z.enum(contactReasons, { error: "Selecciona un motivo." }),
    message: z
      .string({ error: "Escribe tu mensaje." })
      .trim()
      .min(10, "Cuéntame un poco más (mínimo 10 caracteres).")
      .max(2000, "Máximo 2000 caracteres."),
    company: z.string().optional(),
    turnstileToken: z.string().optional(),
  })
  .refine((data) => Boolean(data.email || data.phone), {
    message: "Déjanos un correo o un teléfono para poder responderte.",
    path: ["email"],
  });

export type ContactInput = z.infer<typeof contactSchema>;
