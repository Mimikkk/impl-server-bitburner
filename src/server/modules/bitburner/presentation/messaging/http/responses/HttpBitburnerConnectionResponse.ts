import { ConnectionResource } from "@server/modules/bitburner/application/resources/ConnectionResource.ts";
import { ConnectionEntity } from "@server/modules/connections/domain/entities/ConnectionEntity.ts";
import { HttpJsonResponse } from "@server/presentation/messaging/http/responses/HttpJsonResponse.ts";

export namespace HttpBitburnerConnectionResponse {
  export const [Multiple, multiple] = HttpJsonResponse.custom({
    content: (connections: ConnectionEntity[]) => ({ connections: ConnectionResource.fromConnections(connections) }),
    example: { connections: [{ id: 1 }] },
    name: "Multiple connections",
    description: "Multiple connections",
    status: 200,
    schema: {
      type: "object",
      properties: {
        connections: { type: "array", items: { type: "object", properties: { id: { type: "number" } } } },
      },
    },
  });

  export const [Single, single] = HttpJsonResponse.custom({
    content: (connection: ConnectionEntity) => ({ connection: ConnectionResource.fromConnection(connection) }),
    example: { connection: { id: 1 } },
    name: "Single connection",
    description: "Single connection",
    status: 200,
    schema: {
      type: "object",
      properties: {
        connection: { type: "object", properties: { id: { type: "number" } } },
      },
    },
  });

  export const [Missing, missing] = HttpJsonResponse.custom({
    content: (connectionId: number) => ({ connectionId, message: "Connection not found" }),
    example: { connectionId: 1, message: "Connection not found" },
    name: "Missing connection",
    description: "Connection not found",
    status: 404,
    schema: {
      type: "object",
      properties: {
        connectionId: { type: "number" },
        message: { type: "string" },
      },
    },
  });

  export const [MissingAny, missingAny] = HttpJsonResponse.custom({
    content: () => ({ message: "No available connection found" }),
    example: { message: "No available connection found" },
    name: "Missing any connection",
    description: "No available connection found",
    status: 404,
    schema: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  });
}
