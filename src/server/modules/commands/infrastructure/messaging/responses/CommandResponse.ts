import { RpcJsonResponse } from "../../../../../infrastructure/messaging/responses/rpc/RpcJsonResponse.ts";

export type CommandResponse<R = unknown> = RpcJsonResponse<R>;
