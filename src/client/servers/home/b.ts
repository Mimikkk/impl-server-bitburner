import { sleep } from "./sleep.ts";

export async function main(ns: NS) {
  console.time("S");
  await sleep(10);
  console.timeEnd("S");
}
