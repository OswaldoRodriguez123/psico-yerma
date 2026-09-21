export async function verifyTurnstile(
  token: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "Turnstile omitido: falta TURNSTILE_SECRET_KEY en las variables de entorno.",
    );
    return true;
  }

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret, response: token }),
      },
    );

    const data = (await response.json()) as { success?: boolean };

    return data.success === true;
  } catch (error) {
    console.error("Error al verificar Turnstile:", error);
    return false;
  }
}
