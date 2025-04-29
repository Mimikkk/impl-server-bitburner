import { BitburnerConnectionService } from "@server/modules/bitburner/application/services/BitburnerConnectionService.ts";
import { ConnectionError } from "@server/modules/connections/domain/errors/ConnectionError.ts";
import { ConnectionCommandError } from "../../../connections/domain/errors/ConnectionCommandError.ts";
import { BitburnerClientError } from "../../domain/errors/BitburnerClientError.ts";
import { BitburnerFileSystemClientManager } from "../../infrastructure/files/BitburnerFileSystemClientManager.ts";
import { BitburnerFileSystemServerManager } from "../../infrastructure/files/BitburnerFileSystemServerManager.ts";

export class BitburnerClientService {
  static create() {
    return new BitburnerClientService();
  }

  private constructor(
    private readonly connections = BitburnerConnectionService.create(),
    private readonly serverManager = BitburnerFileSystemServerManager.create(),
  ) {}

  async updateServerDefinition() {
    const connectionResult = this.connections.any();
    if (connectionResult === undefined) {
      return ConnectionError.NoAvailable;
    }

    const definition = await BitburnerFileSystemClientManager
      .fromConnection(connectionResult.value)
      .readDefinition();

    if (definition === undefined) {
      return BitburnerClientError.DefinitionFailed;
    }

    return this.serverManager.updateDefinition(definition);
  }

  canSync() {
    return !!this.connections.any();
  }

  async syncClient() {
    const connectionResult = this.connections.any();
    if (connectionResult === undefined) {
      return ConnectionError.NoAvailable;
    }

    const connection = connectionResult.value;
    const clientManager = BitburnerFileSystemClientManager.fromConnection(connection);

    const clientFileNamesResult = await clientManager.names();
    if (ConnectionCommandError.is(clientFileNamesResult)) {
      return BitburnerClientError.ListFailed;
    }
    const clientFileNames = clientFileNamesResult;
    const removeResult = await clientManager.removeMass(clientFileNames);
    if (ConnectionCommandError.is(removeResult)) {
      return BitburnerClientError.RemoveFailed;
    }

    const serverFiles = await this.serverManager.list();
    const updateMassResult = await clientManager.updateMass(serverFiles);
    if (ConnectionCommandError.is(updateMassResult)) {
      return BitburnerClientError.UpdateFailed;
    }

    return "success";
  }

  async syncServer() {
    const connectionResult = this.connections.any();
    if (connectionResult === undefined) {
      return ConnectionError.NoAvailable;
    }
    const connection = connectionResult.value;

    const clientManager = BitburnerFileSystemClientManager.fromConnection(connection);
    const filesResult = await clientManager.list();
    if (ConnectionCommandError.is(filesResult)) {
      return BitburnerClientError.ListFailed;
    }

    await this.serverManager.clear();
    await this.serverManager.updateMass(filesResult);

    return "success";
  }
}
