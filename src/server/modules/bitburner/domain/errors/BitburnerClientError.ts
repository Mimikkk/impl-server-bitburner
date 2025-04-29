export enum BitburnerClientError {
  NameFailed = "name-command-failed",
  ListFailed = "list-command-failed",
  RemoveFailed = "remove-command-failed",
  UpdateFailed = "update-command-failed",
  RamFailed = "ram-command-failed",
  DefinitionFailed = "definition-command-failed",
}

export namespace BitburnerClientError {
  export const list: BitburnerClientError[] = [
    BitburnerClientError.NameFailed,
    BitburnerClientError.ListFailed,
    BitburnerClientError.RemoveFailed,
    BitburnerClientError.UpdateFailed,
    BitburnerClientError.RamFailed,
    BitburnerClientError.DefinitionFailed,
  ];

  export const is = (error: any): error is BitburnerClientError => list.includes(error);
  export const find = <T>(values: (any | BitburnerClientError)[]): T | BitburnerClientError =>
    Array.isArray(values) ? values.find((v) => is(v)) ?? (values as T) : values;
  export const some = (values: (any | BitburnerClientError)[]): boolean =>
    Array.isArray(values) ? values.some((v) => is(v)) : is(values);
}
