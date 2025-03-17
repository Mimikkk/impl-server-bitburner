import { ConnectionModel } from "@server/modules/connections/domain/models/ConnectionModel.ts";

export namespace ConnectionResource {
  export const fromConnection = ({ id }: ConnectionModel) => ({
    id,
  });

  export const fromConnections = (connections: ConnectionModel[]) => connections.map(fromConnection);
}
