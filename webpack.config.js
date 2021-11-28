const path = require("path");

module.exports = (env) => {
  return {
    target: "node",
    entry: "./index.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
  };
};
