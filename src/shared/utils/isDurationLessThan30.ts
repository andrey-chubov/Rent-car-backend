import { ValidationException } from 'src/exceptions/validation.exception';
import { MAX_30_DAYS } from '../errors/errorMessages';
import { getNumberOfDays } from './getNumberDay';

export const isDurationLessThan30 = (dateSt: string, dateFn: string): void => {
  if (getNumberOfDays(dateSt, dateFn) > 30) {
    throw new ValidationException(MAX_30_DAYS);
  }
};
