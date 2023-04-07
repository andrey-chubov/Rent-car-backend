import { getNumberOfDays } from './getNumberDay';

export const getPrice = (dateSt: string, dateFn: string): number => {
  const duration = getNumberOfDays(dateSt, dateFn);

  if (duration <= 4) {
    return duration * 1000;
  } else if (duration > 4 && duration <= 9) {
    return 4 * 1000 + (duration - 4) * 950;
  } else if (duration > 9 && duration <= 17) {
    return 4 * 1000 + 5 * 950 + (duration - 9) * 900;
  } else {
    return 4 * 1000 + 5 * 950 + 8 * 900 + (duration - 17) * 850;
  }
};
