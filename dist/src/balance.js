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
const cypress_load_balancer_1 = require("cypress-load-balancer");
const input_1 = require("./utils/input");
function getArgv() {
    //For cli
    const runners = (0, input_1.getInputAsInt)(core.getInput("runners"));
    if (runners == null)
        throw Error('The input for "runners" must be defined as an integer');
    const testingType = core.getInput("testing-type");
    const format = core.getInput("format");
    const coreFilePaths = core.getInput("file-paths");
    let filePaths = [];
    if (coreFilePaths.length > 0) {
        filePaths.push(...(0, input_1.getInputAsArray)("file-paths", { trimWhitespace: true })
            .map((fileName) => [`--files`, fileName])
            .flat());
    }
    const argv = [`--runners`, runners.toString(), "--testing-type", testingType, `--gha`];
    if (format)
        argv.push(`--format`, format);
    if (filePaths.length > 0) {
        argv.push(...filePaths);
    }
    return argv;
}
function main() {
    try {
        const argv = getArgv();
        cypress_load_balancer_1.cli.parseSync(argv);
    }
    catch (error) {
        core.setFailed(error.stack);
    }
}
main();
