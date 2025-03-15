import { ValidateFn } from "@server/infrastructure/validators/BodyValidator.ts";

export namespace Validators {
  export interface StringOptions {
    min?: number;
    max?: number;
  }

  export const string = (options?: StringOptions): ValidateFn => (value, field, path) => {
    if (typeof value !== "string") {
      return { field, path, errors: ["value must be a string"] };
    }

    if (options?.min && value.length < options.min) {
      return { field, path, errors: [`value must be at least ${options.min} characters long`] };
    }

    if (options?.max && value.length > options.max) {
      return { field, path, errors: [`value must be at most ${options.max} characters long`] };
    }

    return true;
  };

  export interface NumberOptions {
    min?: number;
    max?: number;
  }

  export const number = (options?: NumberOptions): ValidateFn => (value, field, path) => {
    if (typeof value !== "number") {
      return { field, path, errors: ["value must be a number"] };
    }

    if (options?.min && value < options.min) {
      return { field, path, errors: [`value must be at least ${options.min}`] };
    }

    if (options?.max && value > options.max) {
      return { field, path, errors: [`value must be at most ${options.max}`] };
    }

    return true;
  };
}
