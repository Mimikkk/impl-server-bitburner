export type ValidatorError = { field: string; path: string; errors: string[] };

export interface Validator<P> {
  validate(params: P): P | ValidatorError[];
}
