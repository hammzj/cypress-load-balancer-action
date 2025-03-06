'use strict';

var core = require('@actions/core');
var cache = require('@actions/cache');
var cypressLoadBalancer = require('cypress-load-balancer');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var core__namespace = /*#__PURE__*/_interopNamespaceDefault(core);
var cache__namespace = /*#__PURE__*/_interopNamespaceDefault(cache);

const SPEC_MAP_PATH = ".cypress_load_balancer/spec-map.json";

//Literally copied from https://github.com/actions/cache/blob/main/src/utils/actionUtils.ts
function getInputAsArray(name, options) {
    return core__namespace
        .getInput(name, options)
        .split("\n")
        .map((s) => s.replace(/^!\s+/, "!").trim())
        .filter((x) => x !== "");
}
function getInputAsInt(name, options) {
    const value = parseInt(core__namespace.getInput(name, options));
    if (isNaN(value) || value < 0) {
        return undefined;
    }
    return value;
}

async function restoreCachedLoadBalancingMap() {
    try {
        const cachePrimaryKey = core__namespace.getInput("cache-primary-key");
        const cacheRestoreKeys = getInputAsArray("cache-restore-keys");
        await cache__namespace.restoreCache([SPEC_MAP_PATH], cachePrimaryKey, cacheRestoreKeys);
        //@ts-expect-error Ignore
    }
    catch (error) {
        core__namespace.error(error);
    }
}
function getArgv() {
    const runners = getInputAsInt("runners", { required: true });
    const testingType = core__namespace.getInput("testing-type", { required: true });
    const format = core__namespace.getInput("format");
    const coreFilePaths = getInputAsArray("file-paths", { trimWhitespace: true });
    const globs = getInputAsArray("glob");
    const filePaths = [];
    filePaths.push(...coreFilePaths.map((fileName) => [`--files`, fileName]).flat());
    const argv = [`--runners`, runners.toString(), "--testing-type", testingType, `--gha`];
    if (format)
        argv.push(`--format`, format);
    argv.push(...filePaths);
    argv.push(...globs.map((g) => [`--glob`, g]).flat());
    return argv;
}
async function main() {
    try {
        await restoreCachedLoadBalancingMap();
        const argv = getArgv();
        cypressLoadBalancer.cli.parseSync(argv);
        //@ts-expect-error Ignore
    }
    catch (error) {
        core__namespace.setFailed(error.stack);
    }
}
main();
