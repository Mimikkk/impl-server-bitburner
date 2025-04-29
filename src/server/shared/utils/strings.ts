export namespace Str {
  const newlineRe = /\r\n|\r|\n/;
  const startNewlineRe = /^\r\n|\r|\n/;
  export const trim = (value: string): string => value.trim();
  export const lines = (value: string): string[] => {
    const lines = value.split(newlineRe);
    if (lines[lines.length - 1] === "") lines.pop();
    return lines;
  };

  export const grid = (value: string): string[][] => lines(value).map((l) => l.split(""));

  export const trimlines = (strings: TemplateStringsArray, ...values: unknown[]): string => {
    const str = String.raw({ raw: strings }, ...values).replace(startNewlineRe, "");
    const lines = Str.lines(str);

    const offset = Math.min(...lines.map((l) => l.length - l.trimStart().length));

    return lines
      .map((line) => line.trimEnd().substring(offset))
      .join("\n")
      .trimEnd();
  };

  export const trimStart = (str: string, character: string): string => {
    if (str.length === 1 || str[0] !== character) return str;

    let i = 0;
    while (i < str.length && str[i] === character) ++i;
    if (i === str.length) return character;

    return str.substring(i);
  };

  export const trimEnd = (str: string, character: string): string => {
    if (str.length === 1 || str[str.length - 1] !== character) return str;

    let i = str.length - 1;
    while (i >= 0 && str[i] === character) --i;
    return str.substring(0, i + 1);
  };
}
