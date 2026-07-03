export function formatDate(isoString: string): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
