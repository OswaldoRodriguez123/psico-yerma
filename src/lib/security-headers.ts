/**
 * Cabeceras de seguridad para todo el sitio.
 *
 * La CSP deja pasar solo lo imprescindible: los scripts inline que inyecta
 * Next en la hidratación y el widget de Turnstile del formulario de contacto.
 * El resto (fuentes, imágenes, API) es del propio origen.
 *
 * En desarrollo React necesita `eval()` para reconstruir callstacks: sin
 * `'unsafe-eval'` la hidratación falla y ningún componente cliente responde.
 * Producción nunca usa `eval()`, así que ahí la política se queda estricta.
 */
const isDevelopment = process.env.NODE_ENV === "development";

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  isDevelopment ? "'unsafe-eval'" : null,
  "https://challenges.cloudflare.com",
]
  .filter(Boolean)
  .join(" ");

export const securityHeaders: ReadonlyArray<{ key: string; value: string }> = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
