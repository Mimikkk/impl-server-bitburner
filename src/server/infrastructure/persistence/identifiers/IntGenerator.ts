import { IdentifierGenerator } from "@server/infrastructure/persistence/identifiers/IdentifierGenerator.ts";

export class IntGenerator implements IdentifierGenerator<number> {
  static create(): IntGenerator {
    return new IntGenerator(0);
  }

  private constructor(
    private id: number,
  ) {}

  generate(): number {
    return ++this.id;
  }
}
