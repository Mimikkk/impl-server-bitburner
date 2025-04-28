import { colors } from "@cliffy/ansi/colors";

export namespace Log {
  export const info: typeof console.info = (...message) => {
    console.info(colors.bold.blue("[info]"), ...message);
  };

  export const error: typeof console.error = (...message) => {
    console.error(colors.bold.red("[error]"), ...message);
  };

  export const warn: typeof console.warn = (...message) => {
    console.warn(colors.bold.yellow("[warn]"), ...message);
  };

  export const event: typeof console.log = (...message) => {
    console.log(colors.bold.green("[event]"), ...message);
  };
}
