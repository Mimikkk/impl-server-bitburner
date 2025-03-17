import { Schema } from "@server/infrastructure/validators/Schema.ts";
import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";

export interface Validator<P extends Schema> {
  validate(values: unknown): P | ValidationError[];
}
