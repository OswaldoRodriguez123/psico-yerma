import { describe, expect, it } from "vitest";
import robots from "./robots";

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

describe("robots", () => {
  it("permite explícitamente a los crawlers de IA", () => {
    const { rules } = robots();
    const list = Array.isArray(rules) ? rules : [rules];
    const agents = list.flatMap((rule) =>
      Array.isArray(rule.userAgent) ? rule.userAgent : [rule.userAgent],
    );

    for (const bot of AI_CRAWLERS) {
      expect(agents).toContain(bot);
    }
  });

  it("mantiene cerradas las rutas privadas para esos crawlers", () => {
    const { rules } = robots();
    const list = Array.isArray(rules) ? rules : [rules];
    const aiRule = list.find((rule) =>
      Array.isArray(rule.userAgent)
        ? rule.userAgent.includes("GPTBot")
        : rule.userAgent === "GPTBot",
    );

    expect(aiRule?.disallow).toEqual(["/api/", "/admin", "/login"]);
  });
});
