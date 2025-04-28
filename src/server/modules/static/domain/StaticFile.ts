import { FileReader } from "@server/infrastructure/files/readers/FileReader.ts";

export interface StaticFile<
  C extends StaticFile.Content = StaticFile.Content,
  M extends StaticFile.Mime = StaticFile.Mime,
> {
  content: C;
  mime: M;
}

export namespace StaticFile {
  export type Content = StaticFileNs.TypeFromPath<StaticFileNs.Path>;
  export type Mime = StaticFileNs.MimeFromPath<StaticFileNs.Path>;
}

export namespace StaticFileNs {
  export const enum Extension {
    Html = "html",
    Css = "css",
    Javascript = "js",
    Ico = "ico",
    Json = "json",
  }

  export type Path = `${string}.${Extension}`;

  type InferExtension<P extends string> = P extends `${string}.${infer E}` ? E : never;

  // @ts-expect-error - type inference is not deep enough
  export type MimeFromPath<P extends Path> = InferExtension<P> extends infer E ? typeof MimeMap[E] : never;
  // @ts-expect-error - type inference is not deep enough
  export type TypeFromPath<P extends Path> = InferExtension<P> extends infer E ? FileReader.FileMap[typeof TypeMap[E]]
    : never;

  // @ts-expect-error - type inference is not deep enough
  export type FromPath<P extends Path> = StaticFile<TypeFromPath<P>, MimeFromPath<P>>;

  export const TypeMap = {
    [Extension.Html]: "string",
    [Extension.Css]: "string",
    [Extension.Javascript]: "string",
    [Extension.Ico]: "uint8",
    [Extension.Json]: "string",
  } as const satisfies Record<Extension, FileReader.FileType>;

  export const MimeMap = {
    [Extension.Html]: "text/html",
    [Extension.Css]: "text/css",
    [Extension.Javascript]: "application/javascript",
    [Extension.Ico]: "image/x-icon",
    [Extension.Json]: "application/json",
  } as const satisfies Record<Extension, string>;

  export const mimeFallback = "application/octet-stream";
  export const typeFallback = "string";
}
