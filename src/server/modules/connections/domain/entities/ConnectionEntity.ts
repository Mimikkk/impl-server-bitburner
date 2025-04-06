import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { ConnectionModel } from "../models/ConnectionModel.ts";

export type ConnectionEntity = Entity<number, ConnectionModel>;
