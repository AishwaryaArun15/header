const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { port: 3001 },
  output: { publicPath: "http://localhost:3001/" },
  plugins: [
    new ModuleFederationPlugin({
      name: "appB",
      filename: "remoteEntry.js",
      remotes: {
        appC: "appC@http://localhost:3002/remoteEntry.js",
      },
      exposes: { "./App": "./src/components/App" },
      shared: {
        "react": { singleton: true, requiredVersion: "19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "19.0.0" }
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },
};
