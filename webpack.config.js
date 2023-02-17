const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    popup: {
      import: path.resolve(__dirname, "src/popup", "popup.ts"),
      filename: "src/popup/popup.js",
    },
  },
  output: {
    path: path.join(__dirname, "./dist"),
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
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./manifest.json",
          to: ".",
          force: true,
        },
        {
          from: "./images",
          to: "./images",
        },
        {
          from: "./src",
          to: "./src",
          force: true,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/*.ts", "**/*.html"],
          },
        },
        {
          from: "./src/**/*.html",
          to: ".",
          force: true,
          noErrorOnMissing: true,
          transform(content, absoluteFilename) {
            const contentString = content.toString();
            return contentString.replace(/<script src="(.*?)\.ts"><\/script>/g, '<script src="$1.js"></script>');
          },
        },
      ],
    }),
  ],
};
