export interface RpcJsonRequest<M extends PropertyKey = PropertyKey, P = unknown> {
  jsonrpc: "2.0";
  id: number;
  method: M;
  params: P;
}

export namespace RpcJsonRequest {
  export const create = <M extends PropertyKey, P>(id: number, method: M, params: P): RpcJsonRequest<M, P> => ({
    jsonrpc: "2.0",
    id,
    method,
    params,
  });
}
