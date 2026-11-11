import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Nunito: () => ({ variable: "--font-nunito" }),
}));

import { metadata } from "./layout";

describe("metadata raíz", () => {
  it("declara la verificación de Google Search Console", () => {
    expect(metadata.verification).toMatchObject({
      google: "qa93kDl6um3XM5iNIgbKoCRwojSjXFcYFz4tJk5MzLU",
    });
  });
});
