import * as core from "@actions/core";
import { cli } from "cypress-load-balancer";
import { getInputAsArray, getInputAsInt } from "./utils/input";

function getArgv(): string[] {
  //For cli
  const runners = getInputAsInt(core.getInput("runners"));
  if (runners == null) throw Error('The input for "runners" must be defined as an integer');

  const testingType = core.getInput("testing-type");
  const format = core.getInput("format");
  const coreFilePaths: string[] = getInputAsArray("file-paths", { trimWhitespace: true });
  const globs: string[] = getInputAsArray("glob");

  const filePaths: string[] = [];
  filePaths.push(...coreFilePaths.map((fileName: string) => [`--files`, fileName]).flat());

  const argv = [`--runners`, runners.toString(), "--testing-type", testingType, `--gha`];

  if (format) argv.push(`--format`, format);
  argv.push(...filePaths);
  argv.push(...globs.map((g) => [`--glob`, g]).flat());

  return argv;
}

function main() {
  try {
    const argv = getArgv();
    cli.parseSync(argv);
    //@ts-expect-error Ignore
  } catch (error: Error) {
    core.setFailed(error.stack);
  }
}

main();
