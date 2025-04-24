import { RpcJsonRequest } from "@server/infrastructure/messaging/rpc/requests/RpcJsonRequest.ts";

export type CommandRequest<M extends PropertyKey = PropertyKey, P = any> = RpcJsonRequest<M, P>;
