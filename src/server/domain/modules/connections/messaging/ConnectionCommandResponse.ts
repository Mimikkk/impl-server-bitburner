import { RpcJsonResponse } from "@server/infrastructure/messaging/responses/RpcJsonResponse.ts";

export type ConnectionCommandResponse<R = unknown> = RpcJsonResponse<R>;
