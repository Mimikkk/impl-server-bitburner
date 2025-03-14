import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { EntityFactory } from "@server/infrastructure/persistence/entities/EntityFactory.ts";
import { IdentifierGenerator } from "@server/infrastructure/persistence/identifiers/IdentifierGenerator.ts";

export class IntEntityFactory<E extends Entity<number, any>> implements EntityFactory<E> {
  static create<E extends Entity<number, any>>(
    identifiers: IdentifierGenerator<number>,
  ): IntEntityFactory<E> {
    return new IntEntityFactory<E>(identifiers);
  }

  private constructor(
    private readonly identifiers: IdentifierGenerator<number>,
  ) {}

  create(value: E["value"]): E {
    return { id: this.identifiers.generate(), value: value } as E;
  }
}
