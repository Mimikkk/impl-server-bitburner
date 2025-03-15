import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { Connection } from "./Connection.ts";

export type ConnectionEntity = Entity<number, Connection>;
