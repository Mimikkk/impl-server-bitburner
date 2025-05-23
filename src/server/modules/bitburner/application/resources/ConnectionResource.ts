import { ConnectionEntity } from "@server/modules/connections/domain/entities/ConnectionEntity.ts";

export namespace ConnectionResource {
  export const fromConnection = ({ id }: ConnectionEntity) => ({
    id,
  });

  export const fromConnections = (connections: ConnectionEntity[]) => connections.map(fromConnection);
}
