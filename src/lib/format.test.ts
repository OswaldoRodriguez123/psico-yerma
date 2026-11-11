import { describe, expect, it } from "vitest";
import { formatClp } from "./format";

describe("formatClp", () => {
  it("formatea pesos chilenos sin decimales", () => {
    expect(formatClp(40000)).toBe("$40.000");
  });
});
