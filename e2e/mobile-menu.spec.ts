import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 360, height: 800 } });

const trigger = (page: Page) =>
  page.getByRole("button", { name: /^(abrir|cerrar) menú$/i });
const panel = (page: Page) =>
  page.getByRole("navigation", { name: "Menú" });

async function openMenu(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await trigger(page).click();
  await expect(panel(page)).toBeVisible();
}

test("abre el menú y lo cierra con Escape devolviendo el foco", async ({
  page,
}) => {
  await openMenu(page);

  await expect(trigger(page)).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(panel(page)).toBeHidden();
  await expect(trigger(page)).toHaveAttribute("aria-expanded", "false");
  await expect(trigger(page)).toBeFocused();
});

test("cierra al tocar fuera del panel", async ({ page }) => {
  await openMenu(page);

  await page.locator("main").click({ position: { x: 8, y: 8 } });
  await expect(panel(page)).toBeHidden();
});

test("cierra al activar un enlace del menú y navega", async ({ page }) => {
  await openMenu(page);

  await panel(page).getByRole("link").first().click();
  await expect(panel(page)).toBeHidden();
});

test("respaldo manual sin Popover API: abre y cierra con Escape", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const proto = HTMLElement.prototype as unknown as Record<string, unknown>;
    delete proto.popover;
    delete proto.showPopover;
    delete proto.hidePopover;
    delete proto.togglePopover;
  });

  await openMenu(page);

  await page.keyboard.press("Escape");
  await expect(panel(page)).toBeHidden();
});
