import typescript from "rollup-plugin-typescript2";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";

export default {
  input: "actions/balance/index.ts",
  output: {
    file: "dist/actions/balance/index.js",
    format: "cjs"
  },
  plugins: [typescript()]
};
