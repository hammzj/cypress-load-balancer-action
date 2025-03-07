const core = require("@actions/core");
const cache = require("@actions/cache");
const { cli } = require("cypress-load-balancer");
const { SPEC_MAP_PATH } = require("../../src/constants");
const { getInputAsArray, getInputAsInt } = require("../../src/utils/input");

async function restoreCachedLoadBalancingMap() {
  try {
    const cachePrimaryKey = core.getInput("cache-primary-key");
    const cacheRestoreKeys = getInputAsArray("cache-restore-keys");
    await cache.restoreCache([SPEC_MAP_PATH], cachePrimaryKey, cacheRestoreKeys);
  } catch (error) {
    core.error(error);
  }
}

function getArgv() {
  const runners = getInputAsInt("runners", { required: true });
  const testingType = core.getInput("testing-type", { required: true });
  const format = core.getInput("format");
  const coreFilePaths = getInputAsArray("file-paths", { trimWhitespace: true });
  const globs = getInputAsArray("glob");

  const filePaths = [];
  filePaths.push(...coreFilePaths.map((fileName) => [`--files`, fileName]).flat());

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
  } catch (error) {
    core.setFailed(error.stack);
  }
}

main();
