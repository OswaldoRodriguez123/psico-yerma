const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

/** Formatea un monto en pesos chilenos: 40000 → "$40.000". */
export function formatClp(value: number): string {
  return clp.format(value);
}
