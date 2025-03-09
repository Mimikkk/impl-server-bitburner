export type ControlFn = (request: Request, ...parameters: string[]) => Promise<Response> | Response;
