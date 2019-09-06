const path = require('path');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const { libs } = require('./dll.dependencies');
const project = require('./project.config');

const { __DEV__ } = project.globals;
const OUTPUT_PATH = `${project.paths.dll()}/${__DEV__ ? 'debug' : 'prod'}`;
const DLL_PATH = `${project.paths.dll()}/${__DEV__ ? 'debug' : 'prod'}`;

module.exports = {
  devtool: project.compilerDevtool,
  entry: { libs },
  mode: __DEV__ ? 'development' : 'production',
  output: {
    path: OUTPUT_PATH,
    filename: __DEV__ ? '[name].js' : '[name].[hash:9].js',
    library: '[name]'
  },
  optimization: {
    runtimeChunk: __DEV__,
    minimize: true
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(DLL_PATH, 'manifest.json'),
      name: '[name]',
      context: __dirname
    }),
    new WebpackAssetsManifest({
      output: path.join(DLL_PATH, 'dll.json'),
    }),
  ]
};
