import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { ValidationException } from 'src/exceptions/validation.exception';
import { IValidationFilter } from 'src/shared/types/validationFilter';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  private logger = new Logger('ValidationFilter');

  catch(exception: ValidationException, host: ArgumentsHost): IValidationFilter  {
    const ctx = host.switchToHttp(),
      response = ctx.getResponse();

    this.logger.warn(`${exception.validationErrors}`);
    return response.status(400).json({
      statusCode: 400,
      createdBy: 'ValidationFilter',
      validationErrors: exception.validationErrors,
    });
  }
}
