const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: { port: 3001 },
  output: { publicPath: "http://localhost:3001/" },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ModuleFederationPlugin({
      name: "header",
      filename: "remoteEntry.js",
      remotes: {
        sidebar: "sidebar@http://localhost:3002/remoteEntry.js",
      },
      exposes: { "./Header": "./src/components/Header" },
      shared: {
        react: {
          eager: true,
        },
        "react-dom": {
          eager: true,
        },
      },
    }),
   
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
