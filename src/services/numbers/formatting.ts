export function toFixed(value: number | string, precision: number): number {
  return Number(Number(value).toFixed(precision));
}
