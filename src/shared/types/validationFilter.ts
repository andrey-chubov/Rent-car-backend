export interface IValidationFilter {
  statusCode: number;
  createdBy: string;
  validationErrors: string[] | string;
}
