// Inside webpack.config.js
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./_index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  target: "node",
  node: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'esbuild-loader',
      },
    ],
  },
};
