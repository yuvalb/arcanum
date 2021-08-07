import yargs from "yargs/yargs";

interface Arguments {
  [x: string]: unknown;
  a: boolean;
  b: string;
  c: number | undefined;
  d: (string | number)[] | undefined;
  e: number;
  f: string | undefined;
}

export default async function () {
  const argv: Arguments = yargs(process.argv.slice(2)).options({
    a: { type: "boolean", default: false },
    b: { type: "string", demandOption: true },
    c: { type: "number", alias: "chill" },
    d: { type: "array" },
    e: { type: "count" },
    f: { choices: ["1", "2", "3"] },
  }).argv;

  console.log("Received arguments: ", argv);
}
