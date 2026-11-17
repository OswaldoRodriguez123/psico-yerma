"use client";

import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { nav } from "@/content/site";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

const subscribeToNothing = () => () => {};
const hasNativePopover = () => "popover" in HTMLElement.prototype;

export function MobileNav() {
  const [manualOpen, setManualOpen] = useState(false);
  const [panel, setPanel] = useState<HTMLElement | null>(null);
  const panelId = useId();

  // El HTML del servidor asume el popover nativo; si el navegador no lo
  // soporta, `useSyncExternalStore` cambia al camino manual tras hidratar.
  const native = useSyncExternalStore(
    subscribeToNothing,
    hasNativePopover,
    () => true,
  );

  /**
   * El estado abierto/cerrado se lee del propio popover. Así el icono y la
   * etiqueta siguen la verdad del navegador aunque el cierre venga de Escape o
   * de tocar fuera, y se corrige solo si el panel se abrió antes de hidratar.
   */
  const subscribeToToggle = useCallback(
    (onChange: () => void) => {
      if (!panel) return () => {};

      panel.addEventListener("toggle", onChange);
      return () => panel.removeEventListener("toggle", onChange);
    },
    [panel],
  );

  const isPopoverOpen = useCallback(
    () => (panel ? panel.matches(":popover-open") : false),
    [panel],
  );

  const nativeOpen = useSyncExternalStore(
    subscribeToToggle,
    isPopoverOpen,
    () => false,
  );

  const open = native ? nativeOpen : manualOpen;

  const closeMenu = () => {
    if (native) {
      panel?.hidePopover();
    } else {
      setManualOpen(false);
    }
  };

  // Respaldo para navegadores sin Popover API: el popover nativo ya cierra con
  // Escape; aquí se agrega para que el menú manual no se quede abierto.
  useEffect(() => {
    if (native || !manualOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setManualOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [native, manualOpen]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        popoverTarget={native ? panelId : undefined}
        popoverTargetAction={native ? "toggle" : undefined}
        onClick={native ? undefined : () => setManualOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-primary-soft"
      >
        {open ? (
          <CloseIcon className="h-6 w-6" />
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* El popover vive en la capa superior: su `position` se resuelve contra el
          viewport, no contra el header. El header móvil mide 5rem (py-4 + logo
          h-12), así que el panel arranca justo debajo y ambos escalan con el
          texto. En navegadores sin Popover API `hidden` hace de interruptor. */}
      <nav
        ref={setPanel}
        id={panelId}
        popover={native ? "auto" : undefined}
        hidden={native ? undefined : !manualOpen}
        aria-label="Navegación principal"
        className="fixed inset-x-0 top-20 bottom-auto z-50 m-0 max-h-[calc(100dvh-5rem)] w-full max-w-full overflow-y-auto border-t border-border bg-surface p-0 text-ink shadow-sm"
      >
        <ul className="mx-auto max-w-5xl space-y-1 px-6 py-4 text-base font-semibold">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMenu}
                className="block rounded-xl px-3 py-3 text-ink-soft transition-colors hover:bg-primary-soft hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
