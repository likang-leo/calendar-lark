const path = require('path');
const debug = require('debug')('app:config:project');
const { vendors } = require('./dll.dependencies');
const pkg = require('../package.json');

debug('Creating default configuration.');
const config = {
  env: process.env.NODE_ENV || 'development',
  analyze: process.env.ANALYZE_ENV || 'noanalyze',
  deployName: pkg.name,

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  pathBase: path.resolve(__dirname, '..'),
  dirClient: 'src',
  nodeModules: 'node_modules',
  dirDll: 'dll',
  dirPublic: `/static/${pkg.name}`,
  dirDist: `../build/static/${pkg.name}`,

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  serverHost: process.env.HOST || '127.0.0.1',
  serverPort: parseInt(process.env.PORT, 10) || 3001,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel: {
    compact: true,
    cacheDirectory: true
  },
  compilerDevtool: '#source-map',
  compilerPublicPath: `/static/${pkg.name}`,
  compilerTimestamp: '',
  compilerHashType: 'hash:12',
  compilerVendors: vendors,
};

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env)
  },
  filename: 'index.html',
  NODE_ENV: config.env,
  __DEV__: config.env === 'development',
  __PROD__: config.env === 'production',
  __ANALYZE__: config.analyze === 'analyze',
};

// ------------------------------------
// Utilities
// ------------------------------------
function base() {
  const args = [config.pathBase].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.paths = {
  base,
  client: base.bind(null, config.dirClient),
  nodeModules: base.bind(null, config.nodeModules),
  public: base.bind(null, config.dirPublic),
  dist: base.bind(null, config.dirDist),
  dll: base.bind(null, config.dirDll)
};

function resolvePath(relativePath) {
  return path.resolve(config.pathBase, relativePath);
}
config.alias = {
  '@': resolvePath('src')
};

module.exports = config;
