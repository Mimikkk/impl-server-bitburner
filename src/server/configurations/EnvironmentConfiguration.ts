export namespace EnvironmentConfiguration {
  export const port = +(Deno.env.get("SERVER_PORT") || "8080");
  export const hostname = Deno.env.get("SERVER_HOST") || "127.0.0.1";
}
