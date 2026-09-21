export function parsePhone(input: string): string | null {
  const cleaned = input.replace(/[\s.()-]/g, "");

  return /^\+?\d{7,15}$/.test(cleaned) ? cleaned : null;
}
