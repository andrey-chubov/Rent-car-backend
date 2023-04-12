import { ONE_DAY } from "../constants";

export function getNumberOfDays(start: Date, end: Date): number {
  const diffInTime: number = end.getTime() - start.getTime();
  const diffInDays: number = Math.round(diffInTime / ONE_DAY);

  return Math.abs(diffInDays);
}
