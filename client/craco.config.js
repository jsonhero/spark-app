/* eslint-disable */
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const WebpackBar = require("webpackbar");
const { CracoAliasPlugin, configPaths } = require('react-app-rewire-alias')


const developmentWebpackPlugins = [];
if (process.env.NODE_ENV === "development") {
  developmentWebpackPlugins.push(
    // https://github.com/webpack-contrib/webpack-bundle-analyzer
    new BundleAnalyzerPlugin({ openAnalyzer: false }),
  );
}

module.exports = {
  webpack: {
    plugins: [
      // https://github.com/nuxt/webpackbar#readme
      new WebpackBar({ profile: true }),
      ...developmentWebpackPlugins,
    ],
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        alias: configPaths('./tsconfig.paths.json')
      }
    }
  ],
};