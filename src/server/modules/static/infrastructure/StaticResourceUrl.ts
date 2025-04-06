export enum StaticResourceUrl {
  Favicon = "favicon.ico",
}

export namespace StaticResourceNs {
  const list = Object.values(StaticResourceUrl);

  export const isUrl = (url: any): url is StaticResourceUrl => list.includes(url);
}
