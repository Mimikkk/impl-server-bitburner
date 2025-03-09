import { RpcJsonRequest } from "@server/messages/requests/RpcJsonRequest.ts";
import { RpcJsonResponse } from "@server/messages/responses/RpcJsonResponse.ts";
import { Environment } from "@server/environment.ts";

enum Method {
  Update = "pushFile",
  Remove = "deleteFile",
  Read = "getFile",
  List = "getAllFiles",
  Names = "getFileNames",
  Ram = "calculateRam",
  Definition = "getDefinitionFile",
}

export namespace Command {
  const id = 0;
  const incrementId = () => id + 1;

  const create = <M extends Method, P>(method: M, params: P = {} as P): RpcJsonRequest<M, P> => {
    const parameters = params as P & { server: string };
    parameters.server = Environment.hostname;

    return RpcJsonRequest.create(incrementId(), method, parameters);
  };

  export type OkResponse = "OK";
  export interface FileResource {
    name: string;
    content: string;
  }

  export type UpdateParams = { filename: string; content: string };
  export const update = (params: UpdateParams) => create(Method.Update, params);
  export type UpdateResponse = RpcJsonResponse<OkResponse>;

  export type RemoveParams = { filename: string };
  export const remove = (params: RemoveParams) => create(Method.Remove, params);
  export type RemoveResponse = RpcJsonResponse<OkResponse>;

  export type ReadParams = { filename: string };
  export const read = (params: ReadParams) => create(Method.Read, params);
  export type ReadResponse = RpcJsonResponse<FileResource>;

  export const list = () => create(Method.List);
  export type ListResponse = RpcJsonResponse<FileResource[]>;

  export const names = () => create(Method.Names);
  export type NamesResponse = RpcJsonResponse<string[]>;

  export type RamParams = { filename: string };
  export const ram = (params: RamParams) => create(Method.Ram, params);
  export type RamResponse = RpcJsonResponse<number>;

  export const definition = () => create(Method.Definition);
  export type DefinitionResponse = RpcJsonResponse<string>;
}
