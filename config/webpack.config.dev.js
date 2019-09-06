const debug = require('debug')('app:config:webpack');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Jarvis = require('webpack-jarvis');

const webpackConfigBase = require('./webpack.config.base');
const project = require('./project.config');
const utils = require('./utils');
const pkg = require('../package');
const manifest = require('../dll/debug/manifest.json');
const dll = require('../dll/debug/dll.json');

const getThemeConfig = require(pkg.theme);

const theme = getThemeConfig();
const { __ANALYZE__ } = project.globals;

debug('Creating configuration development');
debug(project.paths.public(dll['libs.js']));

const webpackConfigDev = merge(webpackConfigBase, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    // publicPath: project.compilerPublicPath,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: pkg.title,
      template: project.paths.client('index.html'),
      libs: project.paths.public(dll['libs.js'])
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest
    })
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
    quiet: false,
    noInfo: false,
    stats: {
      color: true
    },
    host: project.serverHost,
    port: project.serverPort,
    contentBase: project.dirClient
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      javascriptEnabled: true,
      modifyVars: theme
    })
  }
});

if (__ANALYZE__) webpackConfigDev.plugins.push(new Jarvis());

module.exports = webpackConfigDev;
