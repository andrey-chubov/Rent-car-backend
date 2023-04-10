import { ValidationException } from '../../exceptions/validation.exception';
import { MAX_30_DAYS } from '../errors/errorMessages';
import { getNumberOfDays } from './getNumberDay';

export const isDurationLessThan30 = (dateStart: string, dateFinish: string): void => {
  if (getNumberOfDays(dateStart, dateFinish) > 30) {
    throw new ValidationException(MAX_30_DAYS);
  }
};
