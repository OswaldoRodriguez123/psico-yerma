import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("metadata de /sobre-mi", () => {
  it("mantiene la description dentro de los 160 caracteres", () => {
    expect(String(metadata.description).length).toBeLessThanOrEqual(160);
  });

  it("declara un canonical autorreferente", () => {
    expect(metadata.alternates?.canonical).toBe("/sobre-mi");
  });
});
