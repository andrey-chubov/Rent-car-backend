import { ONE_DAY } from "../constants";

export function getNumberOfDays(start: string, end: string): number {
  const date1 = new Date(start);
  const date2 = new Date(end);

  const diffInTime: number = date2.getTime() - date1.getTime();
  const diffInDays: number = Math.round(diffInTime / ONE_DAY);

  return Math.abs(diffInDays);
}
