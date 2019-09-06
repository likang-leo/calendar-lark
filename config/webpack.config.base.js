const debug = require('debug')('app:config:webpack');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const project = require('./project.config');

debug('Creating configuration base');
const webpackConfigBase = {
  output: {
    filename: `js/[name].[${project.compilerHashType}]${project.compilerTimestamp}.js`,
    path: project.paths.dist(),
    publicPath: project.compilerPublicPath,
    chunkFilename: 'js/[name].[chunkhash:12].js'
  },
  entry: {
    app: project.paths.client('index.js'),
    vendor: project.compilerVendors
  },
  target: 'web',
  performance: {
    hints: false
  },
  devtool: project.compilerDevtool,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [project.paths.client(), project.paths.nodeModules()],
    alias: project.alias,
    symlinks: false
  },
  externals: {},

  // ------------------------------------
  // Optimization with V4
  // ------------------------------------
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(project.globals),
    // https://doc.webpack-china.org/plugins/context-replacement-plugin/
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(en-gb|zh-cn).js/)
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: project.compiler_babel
      },
      {
        test: /\.(bmp|gif|jpe?g|png)$/,
        loader: 'url-loader',
        exclude: [project.paths.public()],
        options: {
          limit: 20000,
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(otf|eot|ttf|woff2?)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  }
};

module.exports = webpackConfigBase;
