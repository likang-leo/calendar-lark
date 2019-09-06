const debug = require('debug')('app:config:webpack');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundlePlugin = require('webpack-bundle-analyzer');

const webpackConfigBase = require('./webpack.config.base');
const project = require('./project.config');
const utils = require('./utils');
const pkg = require('../package');
const manifest = require('../dll/debug/manifest.json');
const dll = require('../dll/debug/dll.json');

const getThemeConfig = require(pkg.theme);

const { BundleAnalyzerPlugin } = BundlePlugin;
const { __ANALYZE__ } = project.globals;

debug('Creating configuration production');
const webpackConfigProd = merge(webpackConfigBase, {
  mode: 'production',
  output: {
    filename: `js/[name].[${project.compilerHashType}]${project.compilerTimestamp}.js`,
    chunkFilename: 'js/[name].[chunkhash:12].js'
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest
    })
  ],
  module: {
    rules: utils.styleLoaders({ extract: true })
  }
});

if (__ANALYZE__) webpackConfigProd.plugins.push(new BundleAnalyzerPlugin());

module.exports = webpackConfigProd;
