export enum StaticAssetUrl {
  Favicon = "favicon.ico",
}

export namespace StaticAssetNs {
  const list = Object.values(StaticAssetUrl);

  export const isUrl = (url: any): url is StaticAssetUrl => list.includes(url);
}
