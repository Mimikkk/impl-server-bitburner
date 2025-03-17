export type ValidationError = { field: string; path: string; errors: string[] };

export namespace ValidationError {
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
