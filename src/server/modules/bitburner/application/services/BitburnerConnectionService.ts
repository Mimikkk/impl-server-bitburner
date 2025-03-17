import { ConnectionRepository } from "@server/modules/connections/infrastructure/repositories/ConnectionRepository.ts";
import { ConnectionService } from "../../../connections/application/services/ConnectionService.ts";
import { ConnectionModel } from "../../../connections/domain/models/ConnectionModel.ts";
import { BitburnerCommands } from "../../domain/BitburnerCommands.ts";

export class BitburnerConnectionService {
  static create(connections: ConnectionRepository) {
    return new BitburnerConnectionService(ConnectionService.create(connections));
  }

  private constructor(
    private readonly connections: ConnectionService,
  ) {}

  attach(socket: WebSocket): void {
    this.connections.attach(socket);
  }

  all(): IterableIterator<ConnectionModel> {
    return this.connections.list();
  }

  any(): ConnectionModel | undefined {
    return this.connections.list().next().value;
  }

  find(id: number): ConnectionModel | undefined {
    return this.connections.find(id);
  }

  updateDeclaration(): boolean {
    const connection = this.any();
    if (!connection) return false;

    const command = BitburnerCommands.definition;

    const request = command.request(undefined);

    request.listeners.add((response) => {
      console.log({ request, response });
    });

    connection.value.send(request.value);

    return true;
  }
}
