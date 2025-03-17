import { object, Schema } from "@server/infrastructure/validators/Schema.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";
import { Validator } from "@server/infrastructure/validators/Validator.ts";

export class ValueValidator<S extends Schema> implements Validator<S> {
  static create<S extends Schema>(schema: S) {
    return new ValueValidator(schema);
  }

  private constructor(private readonly schema: Schema<S>) {}

  static fromObject<const T extends Record<string, Schema>>(values: T): ValueValidator<Schema<T>> {
    return new ValueValidator(object(values));
  }

  validate(value: unknown): S | ValidationError[] {
    const errors: ValidationError[] = [];

    const result = this.schema(value, "", "");

    if (result === true) return value as S;
    return ValidationError.sum(errors, result);
  }
}
