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

  create(value: E["resource"]): E {
    return { id: this.identifiers.generate(), resource: value } as E;
  }
}
