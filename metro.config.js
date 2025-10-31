const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add asset extensions
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif', 'svg');

// Add source extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs', 'js', 'ts', 'tsx', 'json', 'jsx'];

// Add watch folders
config.watchFolders = [
  path.resolve(__dirname, './'),
  path.resolve(__dirname, './assets'),
  path.resolve(__dirname, './src'),
];

// Add extra node modules
config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (target, name) => {
      return path.join(process.cwd(), `node_modules/${name}`);
    },
  }
);

module.exports = config;
