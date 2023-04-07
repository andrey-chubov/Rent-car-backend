import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from '@nestjs/class-validator';

@ValidatorConstraint()
export class IsWeekEnd implements ValidatorConstraintInterface {
  validate(text: string, validationArguments: ValidationArguments) {
    return (
      new Date(text).getDay() !== validationArguments.constraints[0] &&
      new Date(text).getDay() !== validationArguments.constraints[1]
    );
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date wrong!';
  }
}
