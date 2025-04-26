import { RequestBodyObject, SchemaObject } from "openapi3-ts/oas31";

export class RequestContent<T = object> {
  static create<T>({ name, example, description, properties }: RequestContent.Options<T>): RequestContent<T> {
    return new RequestContent(name, example, description, properties);
  }

  private constructor(
    public readonly name: string,
    public readonly example: T,
    public readonly description: string,
    public readonly properties: Record<keyof T, SchemaObject>,
  ) {}

  toObject(): RequestBodyObject {
    return {
      description: this.description,
      required: true,
      content: {
        "application/json": {
          example: this.example,
          schema: {
            type: "object",
            properties: this.properties,
          },
        },
      },
    };
  }
}

export namespace RequestContent {
  export interface Options<T> {
    name: string;
    example: T;
    description: string;
    properties: Record<keyof T, SchemaObject>;
  }
}
