import { describe, expect, it } from "vitest";
import { renderLlms } from "@/content/llms";
import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("sirve el contenido como texto plano", async () => {
    const response = await GET();

    expect(response.headers.get("content-type")).toContain("text/plain");
    expect(await response.text()).toBe(renderLlms());
  });
});
