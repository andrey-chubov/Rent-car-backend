import { ValidationException } from '../../exceptions/validation.exception';
import { MAX_30DAYS } from '../errors/errorMessages';
import { getNumberOfDays } from './getNumberDay';

export const assertDurationLessThan30 = (dateStart: Date, dateFinish: Date): void => {
  if (getNumberOfDays(dateStart, dateFinish) > 30) {
    throw new ValidationException(MAX_30DAYS);
  }
};
