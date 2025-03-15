import { Entity } from "@server/infrastructure/persistence/entities/Entity.ts";

export class IntEntity<V> implements Entity<number, V> {
  static create<V>(id: number, value: V): IntEntity<V> {
    return new IntEntity(id, value);
  }

  private constructor(
    public readonly id: number,
    public readonly value: V,
  ) {}
}
