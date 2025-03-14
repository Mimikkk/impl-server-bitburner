import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";

export interface EntityFactory<E extends Entity> {
  create(value: E["value"]): E;
}
