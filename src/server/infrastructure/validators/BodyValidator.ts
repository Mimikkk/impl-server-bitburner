import { Validator, ValidatorError } from "@server/infrastructure/validators/Validator.ts";

export type ValidateFn = (value: any, field: string, path: string) => true | ValidatorError;

export class BodyValidator<P> implements Validator<P> {
  static create<P extends Record<string, any>>(
    fields: Record<keyof P, ValidateFn | ValidateFn[]>,
  ): BodyValidator<P> {
    return new BodyValidator(fields);
  }

  private constructor(
    private readonly fields: Record<keyof P, ValidateFn | ValidateFn[]>,
  ) {}

  validate(params: P): P | ValidatorError[] {
    const errors: ValidatorError[] = [];

    for (const key in params) {
      const value = params[key];
      const validator = this.fields[key];
      const path = key;

      if (Array.isArray(validator)) {
        for (const validatorFn of validator) {
          const result = validatorFn(value, key, path);

          if (result === true) continue;

          errors.push(result);
        }
      } else {
        const result = validator(value, key, path);

        if (result === true) continue;
        errors.push(result);
      }
    }

    if (errors.length > 0) {
      return errors;
    }

    return params;
  }
}
