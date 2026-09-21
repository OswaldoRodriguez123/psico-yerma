import { createContact } from "@/features/contact/server/create-contact";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "El cuerpo de la solicitud no es válido." },
      { status: 400 },
    );
  }

  const result = await createContact(body);

  if (!result.ok && result.reason === "invalid") {
    return Response.json(
      { error: "Revisa los datos enviados.", fieldErrors: result.fieldErrors },
      { status: 400 },
    );
  }

  if (!result.ok) {
    return Response.json(
      { error: "No pudimos enviar tu mensaje. Inténtalo más tarde." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 201 });
}
