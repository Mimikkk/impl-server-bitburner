import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/rpc/RpcJsonResponse.ts";

export type CommandResponse<R = unknown> = RpcJsonResponse<R>;
