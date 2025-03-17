import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";

export type CommandResponse<R = unknown> = RpcJsonResponse<R>;
