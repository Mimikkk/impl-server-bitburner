import { Nil } from "@shared/types/common.ts";

export interface RpcJsonResponseError {
  jsonrpc: "2.0";
  id: number;
  error: unknown;
}

export interface RpcJsonResponseResult<R = any> {
  jsonrpc: "2.0";
  id: number;
  result: R;
}

export type RpcJsonResponse<R = unknown> = RpcJsonResponseError | RpcJsonResponseResult<R>;

export namespace RpcJsonResponse {
  export const tryFrom = <R>(data: Nil<string>): RpcJsonResponse<R> | undefined => {
    if (data === undefined || data === null) return;

    try {
      return JSON.parse(data) as RpcJsonResponse<R>;
    } catch (error) {
      return;
    }
  };

  export const isError = <R>(response: RpcJsonResponse<R>): response is RpcJsonResponseError => "error" in response;

  export const isOk = <R>(response: RpcJsonResponse<R>): response is RpcJsonResponseResult<R> => "result" in response;
}
