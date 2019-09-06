const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const Autoprefixer = require('autoprefixer');
const Cssnano = require('cssnano');

const project = require('./project.config');

const { __PROD__ } = project.globals;

function cssLoaders(options = {}) {
  const { sourceMap = false } = options;
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: __PROD__ && { safe: true },
      sourceMap,
      importLoaders: 1
    }
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      sourceMap,
      plugins: () => [
        PostcssFlexbugsFixes,
        Autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          flexbox: 'no-2009'
        }),
        Cssnano()
      ]
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader, postcssLoader];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign(
          {
            sourceMap: options.sourceMap
          },
          loaderOptions
        )
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      });
    }
    return ['style-loader'].concat(loaders);
  }

  return {
    css: generateLoaders(),
    less: generateLoaders('less', options)
  };
}

exports.styleLoaders = function styleLoaders(options) {
  const output = [];
  const loaders = cssLoaders(options);
  Object.keys(loaders).forEach((extension) => {
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loaders[extension]
    });
  });
  return output;
};
