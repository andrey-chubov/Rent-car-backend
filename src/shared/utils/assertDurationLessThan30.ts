import { ValidationException } from '../../exceptions/validation.exception';
import { DATE_DIFFERENCE_SHOULD_BE_LESS_THAN_30_DAYS } from '../errors/errorMessages';
import { getNumberOfDays } from './getNumberDay';

export const assertDurationLessThan30 = (dateStart: Date, dateFinish: Date): void => {
  if (getNumberOfDays(dateStart, dateFinish) > 30) {
    throw new ValidationException(DATE_DIFFERENCE_SHOULD_BE_LESS_THAN_30_DAYS);
  }
};
