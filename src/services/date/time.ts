export function parseTime(time: string): { hours: number; minutes: number } {
  return {
    hours: parseInt(time.slice(0, 2)),
    minutes: parseInt(time.slice(3, 5)),
  };
}
