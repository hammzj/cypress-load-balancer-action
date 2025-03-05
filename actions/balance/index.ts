import * as core from "@actions/core";
import * as cache from "@actions/cache";
import { cli } from "cypress-load-balancer";
import { getInputAsArray, getInputAsInt } from "../../src/utils/input";
import { SPEC_MAP_PATH } from "../../src/constants";

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

function getArgv(): string[] {
  const runners = getInputAsInt("runners");
  console.log('CYPRESS_CONFIG_FILE', process.env.CYPRESS_CONFIG_FILE)
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

async function main() {
  try {
    await restoreCachedLoadBalancingMap();
    const argv = getArgv();
    cli.parseSync(argv);
    //@ts-expect-error Ignore
  } catch (error: Error) {
    core.setFailed(error.stack);
  }
}

main();
