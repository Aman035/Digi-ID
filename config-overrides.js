const webpack = require('webpack')

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {}
  fallback.crypto = require.resolve('crypto-browserify')
  fallback.stream = require.resolve('stream-browserify')
  fallback.buffer = require.resolve('buffer')
  config.resolve.fallback = fallback
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ])
  config.resolve.extensions.push('.mjs')
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  })

  return {
    ...config,
    // This is needed to not show the warning about this modules don't have src files, only on dist (build)
    ignoreWarnings: [
      {
        module: /node_modules\/eth-sig-util/,
      },
      {
        module: /node_modules\/ethereumjs-util/,
      },
      {
        module: /node_modules\/@metamask/,
      },
    ],
  }
}
