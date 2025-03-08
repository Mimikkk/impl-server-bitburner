export interface RpcJsonRequest<M extends string = string, P = unknown> {
  jsonrpc: "2.0";
  id: number;
  method: M;
  params: P;
}

export namespace RpcJsonRequest {
  export const create = <M extends string, P>(id: number, method: M, params: P): RpcJsonRequest<M, P> => ({
    jsonrpc: "2.0",
    id,
    method,
    params,
  });
}
