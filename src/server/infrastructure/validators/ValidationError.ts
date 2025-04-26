export type ValidationError = { field: string; path: string; messages: string[] };

export namespace ValidationError {
  export const is = (error: unknown): error is ValidationError | ValidationError[] =>
    Array.isArray(error)
      ? error.some(ValidationError.is)
      : typeof error === "object" && error !== null && "field" in error && "path" in error && "errors" in error;

  export const sum = (errors: ValidationError[], error: ValidationError | ValidationError[]): ValidationError[] => {
    if (Array.isArray(error)) {
      errors.push(...error);
    } else {
      errors.push(error);
    }

    return errors;
  };

  export const collect = (errors: ValidationError[]): true | ValidationError[] => errors.length > 0 ? errors : true;
}
