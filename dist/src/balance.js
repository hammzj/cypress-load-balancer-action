"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const cache = __importStar(require("@actions/cache"));
const cypress_load_balancer_1 = require("cypress-load-balancer");
const constants_1 = require("./constants");
const input_1 = require("./utils/input");
async function restoreCachedLoadBalancingMap() {
    try {
        const cachePrimaryKey = core.getInput("cache-primary-key");
        const cacheRestoreKeys = (0, input_1.getInputAsArray)("cache-restore-keys");
        await cache.restoreCache([constants_1.SPEC_MAP_PATH], cachePrimaryKey, cacheRestoreKeys);
        //@ts-expect-error Ignore
    }
    catch (error) {
        core.error(error);
    }
}
function getArgv() {
    const runners = (0, input_1.getInputAsInt)("runners", { required: true });
    const testingType = core.getInput("testing-type", { required: true });
    const format = core.getInput("format");
    const coreFilePaths = (0, input_1.getInputAsArray)("file-paths", { trimWhitespace: true });
    const globs = (0, input_1.getInputAsArray)("glob");
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
        cypress_load_balancer_1.cli.parseSync(argv);
        //@ts-expect-error Ignore
    }
    catch (error) {
        core.setFailed(error.stack);
    }
}
main();
