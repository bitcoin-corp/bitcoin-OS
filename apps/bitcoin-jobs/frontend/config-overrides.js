const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer"),
    "process": require.resolve("process/browser"),
  });
  config.resolve.fallback = fallback;
  
  // Fix for react-router-dom v6 with webpack 5
  config.resolve.alias = {
    ...config.resolve.alias,
    "process/browser": require.resolve("process/browser")
  };
  
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  
  // Fix for fully specified imports
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto'
  });
  
  return config;
}