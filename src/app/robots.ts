import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Crawlers de IA: mismo permiso de lectura que el resto del sitio, con las
// mismas rutas privadas cerradas.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
];

const PRIVATE_ROUTES = ["/api/", "/admin", "/login"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
