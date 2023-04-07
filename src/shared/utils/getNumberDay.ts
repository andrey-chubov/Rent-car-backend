export function getNumberOfDays(start: string, end: string): number {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay: number = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime: number = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays: number = Math.round(diffInTime / oneDay);

  return Math.abs(diffInDays);
}
