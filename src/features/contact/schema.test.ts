import { describe, expect, it } from "vitest";
import { contactSchema } from "./schema";
import { parsePhone } from "@/lib/phone";

const validContact = {
  name: "Ana Pérez",
  email: "ana@example.com",
  phone: "+56 9 1234 5678",
  reason: "consulta",
  message: "Hola, quiero agendar una hora.",
};

function parseValid(input: unknown) {
  const result = contactSchema.safeParse(input);

  if (!result.success) {
    throw new Error(JSON.stringify(result.error.issues));
  }

  return result.data;
}

function isInvalid(input: unknown) {
  return !contactSchema.safeParse(input).success;
}

describe("contactSchema", () => {
  it("acepta un contacto válido y normaliza correo y teléfono", () => {
    const data = parseValid({ ...validContact, email: "  Ana@Example.COM " });

    expect(data.email).toBe("ana@example.com");
    expect(data.phone).toBe("+56912345678");
  });

  it("acepta teléfonos con o sin prefijo +56", () => {
    expect(parseValid({ ...validContact, phone: "9 1234 5678" }).phone).toBe(
      "912345678",
    );
    expect(
      parseValid({ ...validContact, phone: "56912345678" }).phone,
    ).toBe("56912345678");
  });

  it("acepta un teléfono de otro país (solo valida que sea un número)", () => {
    expect(
      parseValid({ ...validContact, phone: "+1 555 123 4567" }).phone,
    ).toBe("+15551234567");
  });

  it("deja en null el campo vacío", () => {
    expect(parseValid({ ...validContact, phone: "" }).phone).toBeNull();
    expect(parseValid({ ...validContact, email: "" }).email).toBeNull();
  });

  it("acepta solo teléfono, sin correo", () => {
    const data = parseValid({
      name: "Ana Pérez",
      phone: "+56 9 1234 5678",
      reason: "consulta",
      message: "Hola, quiero agendar una hora.",
    });

    expect(data.email).toBeNull();
    expect(data.phone).toBe("+56912345678");
  });

  it("acepta solo correo, sin teléfono", () => {
    const data = parseValid({
      name: "Ana Pérez",
      email: "ana@example.com",
      reason: "consulta",
      message: "Hola, quiero agendar una hora.",
    });

    expect(data.phone).toBeNull();
    expect(data.email).toBe("ana@example.com");
  });

  it("rechaza un contacto sin correo ni teléfono", () => {
    expect(
      isInvalid({
        name: "Ana Pérez",
        reason: "consulta",
        message: "Hola, quiero agendar una hora.",
      }),
    ).toBe(true);
  });

  it("rechaza un teléfono con letras o demasiado corto", () => {
    expect(isInvalid({ ...validContact, phone: "abc123" })).toBe(true);
    expect(isInvalid({ ...validContact, phone: "123" })).toBe(true);
  });

  it("rechaza un correo inválido", () => {
    expect(
      isInvalid({ ...validContact, email: "no-es-correo", phone: "" }),
    ).toBe(true);
  });

  it("rechaza un nombre con números o símbolos", () => {
    expect(isInvalid({ ...validContact, name: "Ana123" })).toBe(true);
    expect(isInvalid({ ...validContact, name: "@na" })).toBe(true);
    expect(isInvalid({ ...validContact, name: "A" })).toBe(true);
  });

  it("rechaza un mensaje muy corto", () => {
    expect(isInvalid({ ...validContact, message: "hola" })).toBe(true);
  });

  it("rechaza un motivo que no está en la lista", () => {
    expect(isInvalid({ ...validContact, reason: "inventado" })).toBe(true);
  });

  it("rechaza un cuerpo vacío", () => {
    expect(isInvalid({})).toBe(true);
  });
});

describe("parsePhone", () => {
  it("devuelve null para entradas inválidas", () => {
    expect(parsePhone("")).toBeNull();
    expect(parsePhone("abc")).toBeNull();
    expect(parsePhone("123")).toBeNull();
  });

  it("limpia separadores y conserva el prefijo", () => {
    expect(parsePhone("+56 9 1234 5678")).toBe("+56912345678");
    expect(parsePhone("(9) 1234-5678")).toBe("912345678");
  });
});
