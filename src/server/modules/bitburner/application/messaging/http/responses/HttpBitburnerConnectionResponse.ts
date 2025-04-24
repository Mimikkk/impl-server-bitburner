import { HttpJsonResponse } from "@server/infrastructure/messaging/http/responses/HttpJsonResponse.ts";
import { ConnectionResource } from "@server/modules/bitburner/application/resources/ConnectionResource.ts";
import { ConnectionEntity } from "@server/modules/connections/domain/entities/ConnectionEntity.ts";

export namespace HttpBitburnerConnectionResponse {
  export const [Multiple, multiple] = HttpJsonResponse.custom({
    content: (connections: ConnectionEntity[]) => ({ connections: ConnectionResource.fromConnections(connections) }),
    example: { connections: [{ id: 1 }] },
    name: "Multiple connections",
    description: "Multiple connections",
    status: 200,
  });

  export const [Single, single] = HttpJsonResponse.custom({
    content: (connection: ConnectionEntity) => ({ connection: ConnectionResource.fromConnection(connection) }),
    example: { connection: { id: 1 } },
    name: "Single connection",
    description: "Single connection",
    status: 200,
  });

  export const [Missing, missing] = HttpJsonResponse.custom({
    content: (connectionId: number) => ({ connectionId, message: "Connection not found" }),
    example: { connectionId: 1, message: "Connection not found" },
    name: "Missing connection",
    description: "Connection not found",
    status: 404,
  });
}
