import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("metadata de la home", () => {
  it("declara un canonical autorreferente en la raíz", () => {
    expect(metadata.alternates?.canonical).toBe("/");
  });
});
