import { renderLlms } from "@/content/llms";

// Se prerenderiza en el build: el texto depende solo de contenido estático.
export const dynamic = "force-static";

export function GET(): Response {
  return new Response(renderLlms(), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
