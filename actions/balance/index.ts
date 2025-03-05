import core from "@actions/core";
import cache from "@actions/cache";
import { cli } from "cypress-load-balancer";
import { SPEC_MAP_PATH } from "../../src/constants";
import { getInputAsArray, getInputAsInt } from "../../src/utils/input";
//@ts-expect-error Types do not exist
import {getSpecs} from 'find-cypress-specs'
async function restoreCachedLoadBalancingMap() {
  try {
    const cachePrimaryKey = core.getInput("cache-primary-key");
    const cacheRestoreKeys = getInputAsArray("cache-restore-keys");
    await cache.restoreCache([SPEC_MAP_PATH], cachePrimaryKey, cacheRestoreKeys);
    //@ts-expect-error Ignore
  } catch (error: Error) {
    core.error(error);
  }
}

function getArgv() {
  const runners = getInputAsInt("runners", { required: true });
  const testingType = core.getInput("testing-type", { required: true });
  const format = core.getInput("format");
  const coreFilePaths = getInputAsArray("file-paths", { trimWhitespace: true });
  const globs = getInputAsArray("glob");

  const filePaths: string[] = [];
  filePaths.push(...coreFilePaths.map((fileName: string) => [`--files`, fileName]).flat());

  const argv = [`--runners`, (runners as number).toString(), "--testing-type", testingType, `--gha`];
  if (format) argv.push(`--format`, format);
  argv.push(...filePaths);
  argv.push(...globs.map((g: string) => [`--glob`, g]).flat());

  return argv;
}

async function main() {
  try {
    await restoreCachedLoadBalancingMap();
    const argv = getArgv();

    //THIS SHOULD FAIL
    console.log(getSpecs(undefined, 'e2e'))

    cli.parseSync(argv);
    //@ts-expect-error Ignore
  } catch (error: Error) {
    core.setFailed(error.stack);
  }
}

main();
