import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from '@nestjs/class-validator';
import { WEEKEND } from '../shared/errors/errorMessages';

@ValidatorConstraint()
export class IsWeekEnd implements ValidatorConstraintInterface {
  validate(date: Date, validationArguments: ValidationArguments): boolean {
    return (
      date.getDay() !== validationArguments.constraints[0] &&
      date.getDay() !== validationArguments.constraints[1]
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return WEEKEND;
  }
}
