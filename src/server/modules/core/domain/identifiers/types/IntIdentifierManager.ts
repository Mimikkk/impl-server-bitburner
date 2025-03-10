import { IdentifierManager } from "@server/modules/core/domain/identifiers/Identifier.manager.ts";

export class IntIdentifierManager implements IdentifierManager<number> {
  static create(): IntIdentifierManager {
    return new IntIdentifierManager(0);
  }

  private constructor(
    private id: number,
  ) {}

  next(): number {
    return ++this.id;
  }
}
