const sleep = (ms: number) => 
  new Promise((resolve) =>  setTimeout(resolve, ms));

export async function main(ns: NS) {
  new Promise(() => {
    sleep(30_000).then(() => console.log("B"));
  })
  console.log("A");
}
