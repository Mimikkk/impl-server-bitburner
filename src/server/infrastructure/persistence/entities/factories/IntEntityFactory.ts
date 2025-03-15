import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";
import { EntityFactory } from "@server/infrastructure/persistence/entities/factories/EntityFactory.ts";
import { IntEntity } from "@server/infrastructure/persistence/entities/IntEntity.ts";
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
    return IntEntity.create(this.identifiers.generate(), value) as E;
  }
}
