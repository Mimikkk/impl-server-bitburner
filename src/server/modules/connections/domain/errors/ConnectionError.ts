export enum ConnectionError {
  NoAvailable = "no-available",
}

export namespace ConnectionError {
  export const list: ConnectionError[] = [
    ConnectionError.NoAvailable,
  ];

  export const is = (error: any): error is ConnectionError => list.includes(error);
  export const find = <T>(values: (any | ConnectionError)[]): T | ConnectionError =>
    Array.isArray(values) ? values.find((v) => is(v)) ?? (values as T) : values;
  export const some = (values: (any | ConnectionError)[]): boolean =>
    Array.isArray(values) ? values.some((v) => is(v)) : is(values);
}
