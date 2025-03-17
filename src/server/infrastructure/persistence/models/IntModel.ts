import { Model } from "./Model.ts";

export class IntModel<V> implements Model<number, V> {
  static create<V>(id: number, value: V): IntModel<V> {
    return new IntModel(id, value);
  }

  private constructor(
    public readonly id: number,
    public readonly value: V,
  ) {}
}
