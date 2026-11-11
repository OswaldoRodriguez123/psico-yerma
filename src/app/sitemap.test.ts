import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("fecha cada URL con la última edición del contenido", () => {
    const entries = sitemap();

    expect(entries).toHaveLength(5);
    for (const entry of entries) {
      expect(entry.lastModified).toEqual(new Date(site.contentUpdatedAt));
    }
  });
});
