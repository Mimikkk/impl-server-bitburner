export enum ConnectionCommandError {
  InvalidRequest = "invalid-request",
  InvalidResponse = "invalid-response",
  Internal = "internal",
}

export namespace ConnectionCommandError {
  export const list: ConnectionCommandError[] = [
    ConnectionCommandError.InvalidRequest,
    ConnectionCommandError.InvalidResponse,
    ConnectionCommandError.Internal,
  ];

  export const is = (error: any): error is ConnectionCommandError => list.includes(error);
  export const find = <T>(values: (any | ConnectionCommandError)[]): T | ConnectionCommandError =>
    Array.isArray(values) ? values.find((v) => is(v)) ?? (values as T) : values;
  export const some = (values: (any | ConnectionCommandError)[]): boolean =>
    Array.isArray(values) ? values.some((v) => is(v)) : is(values);
}
