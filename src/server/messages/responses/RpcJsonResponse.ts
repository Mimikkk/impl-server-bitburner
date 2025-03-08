export interface RpcJsonResponseError {
  jsonrpc: "2.0";
  id: number;
  error: unknown;
}

export interface RpcJsonResponseResult<R> {
  jsonrpc: "2.0";
  id: number;
  result: R;
}

export type RpcJsonResponse<R = unknown> = RpcJsonResponseError | RpcJsonResponseResult<R>;

export namespace RpcJsonResponse {
  export const isError = <R>(response: RpcJsonResponse<R>): response is RpcJsonResponseError => "error" in response;

  export const isOk = <R>(response: RpcJsonResponse<R>): response is RpcJsonResponseResult<R> => "result" in response;
}
