export function sortByDate(a: Date, b: Date): number {
  return a.getTime() - b.getTime();
}