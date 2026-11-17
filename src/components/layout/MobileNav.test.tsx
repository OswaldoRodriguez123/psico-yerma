import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MobileNav } from "./MobileNav";

const html = renderToStaticMarkup(<MobileNav />);

describe("menú móvil", () => {
  it("usa un popover nativo en vez de un dropdown propio", () => {
    expect(html).toContain('popover="auto"');
  });

  it("deja que el botón abra y cierre el popover sin JavaScript extra", () => {
    const target = html.match(/popovertarget="([^"]+)"/i)?.[1];
    const panelId = html.match(/<nav[^>]*id="([^"]+)"/)?.[1];

    expect(target).toBeTruthy();
    expect(panelId).toBe(target);
  });

  it("mantiene el estado accesible del botón", () => {
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="');
    expect(html).toContain('aria-label="Abrir menú"');
  });
});
