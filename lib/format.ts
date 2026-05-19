export function formatEuro(amount: number): string {
  return Math.ceil(amount).toLocaleString("it-IT");
}
