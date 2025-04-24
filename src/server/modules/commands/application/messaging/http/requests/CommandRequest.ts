import { RpcJsonRequest } from "@server/infrastructure/messaging/requests/RpcJsonRequest.ts";

export type CommandRequest<M extends PropertyKey = PropertyKey, P = any> = RpcJsonRequest<M, P>;
