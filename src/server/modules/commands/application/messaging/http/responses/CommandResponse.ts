import { RpcJsonResponse } from "@server/infrastructure/messaging/rpc/responses/RpcJsonResponse.ts";

export type CommandResponse<R = unknown> = RpcJsonResponse<R>;
