import * as core from "@actions/core";
import { cli } from "cypress-load-balancer";
import { getInputAsArray, getInputAsInt } from "./utils/input";

function getArgv(): string[] {
  //For cli
  const runners = getInputAsInt(core.getInput("runners"));
  if (runners == null) throw Error('The input for "runners" must be defined as an integer');

  const testingType = core.getInput("testing-type");
  const format = core.getInput("format");
  const coreFilePaths: string = core.getInput("file-paths");
  let filePaths: string[] = [];

  if (coreFilePaths.length > 0) {
    filePaths.push(
      ...getInputAsArray("file-paths", { trimWhitespace: true })
        .map((fileName: string) => [`--files`, fileName])
        .flat()
    );
  }
  const argv = [`--runners`, runners.toString(), "--testing-type", testingType, `--gha`];
  if (format) argv.push(`--format`, format);
  if (filePaths.length > 0) {
    argv.push(...filePaths);
  }
  return argv;
}

function main() {
  try {
    const argv = getArgv();
    cli.parseSync(argv);
  } catch (error) {
    core.setFailed((error as any).stack);
  }
}

main();
