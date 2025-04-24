import { RpcJsonResponse } from "@server/presentation/messaging/rpc/responses/RpcJsonResponse.ts";

export type CommandResponse<R = unknown> = RpcJsonResponse<R>;
