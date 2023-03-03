const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    background: {
      import: path.resolve(__dirname, "src/background/background.ts"),
      filename: "background.js",
    },
    content: {
      import: path.resolve(__dirname, "src/content/content.ts"),
      filename: "content.js",
    },
  },
  output: {
    path: path.join(__dirname, "./build"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
