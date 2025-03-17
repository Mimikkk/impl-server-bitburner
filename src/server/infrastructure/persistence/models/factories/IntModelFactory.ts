import { IdentifierGenerator } from "@server/infrastructure/persistence/identifiers/IdentifierGenerator.ts";
import { IntModel } from "../IntModel.ts";
import { Model } from "../Model.ts";
import { ModelFactory } from "./ModelFactory.ts";

export class IntModelFactory<M extends Model<number, any>> implements ModelFactory<M> {
  static create<M extends Model<number, any>>(
    identifiers: IdentifierGenerator<number>,
  ): IntModelFactory<M> {
    return new IntModelFactory<M>(identifiers);
  }

  private constructor(
    private readonly identifiers: IdentifierGenerator<number>,
  ) {}

  create(value: M["value"]): M {
    return IntModel.create(this.identifiers.generate(), value) as M;
  }
}
