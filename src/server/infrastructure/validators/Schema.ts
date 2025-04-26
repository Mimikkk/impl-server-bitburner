import { ValidationError } from "@server/infrastructure/validators/ValidationError.ts";

export type Schema<T = unknown> = (
  value: unknown,
  field: string,
  path: string,
) => true | ValidationError | ValidationError[];

export type Infer<T extends Schema> = T extends Schema<infer U>
  ? U extends Record<string, Schema> ? { [K in keyof U]: Infer<U[K]> }
  : U extends Schema[] ? Infer<U[number]>[]
  : U
  : never;

export interface StringOptions<T extends string = string> {
  const?: T;
  min?: number;
  max?: number;
}

export const string = <const T extends string>(options?: StringOptions<T>): Schema<T> => (value, field, path) => {
  if (typeof value !== "string") {
    return { field, path, messages: ["value must be a string"] };
  }

  if (options?.const && value !== options.const) {
    return { field, path, messages: [`value must be ${options.const}`] };
  }

  if (options?.min && value.length < options.min) {
    return { field, path, messages: [`value must be at least ${options.min} characters long`] };
  }

  if (options?.max && value.length > options.max) {
    return { field, path, messages: [`value must be at most ${options.max} characters long`] };
  }

  return true;
};

export interface NumberOptions<T extends number = number> {
  const?: T;
  min?: number;
  max?: number;
}

export const number = <const T extends number>(options?: NumberOptions<T>): Schema<T> => (value, field, path) => {
  if (typeof value !== "number") {
    return { field, path, messages: ["value must be a number"] };
  }

  if (options?.const && value !== options.const) {
    return { field, path, messages: [`value must be ${options.const}`] };
  }

  if (options?.min && value < options.min) {
    return { field, path, messages: [`value must be at least ${options.min}`] };
  }

  if (options?.max && value > options.max) {
    return { field, path, messages: [`value must be at most ${options.max}`] };
  }

  return true;
};

export const object = <const T extends Record<string, Schema>>(schema: T): Schema<T> => (value, field, path) => {
  const errors: ValidationError[] = [];

  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    errors.push({ field, path, messages: ["value must be a record object"] });
    return errors;
  }

  for (const key in schema) {
    const result = schema[key](value[key as keyof typeof value], key, `${path}.${key}`);
    if (result === true) continue;

    ValidationError.sum(errors, result);
  }

  return ValidationError.collect(errors);
};

export const array = <const T extends Schema>(schema: T): Schema<T[]> => (value, field, path) => {
  if (!Array.isArray(value)) {
    return { field, path, messages: ["value must be an array"] };
  }

  const errors: ValidationError[] = [];

  for (let i = 0; i < value.length; ++i) {
    const result = schema(value[i], `${field}[${i}]`, `${path}[${i}]`);

    if (result === true) continue;

    ValidationError.sum(errors, result);
  }

  return ValidationError.collect(errors);
};

export const none = (): Schema<undefined> => () => true;
