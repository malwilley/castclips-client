const SentryCliPlugin = require('@sentry/webpack-plugin')

module.exports = function override(config, env) {
  if (env === 'production' && process.env.SENTRY_AUTH_TOKEN) {
    config.plugins.push(
      new SentryCliPlugin({
        include: '.',
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
        configFile: 'sentry.properties',
      })
    )
  }

  return config
}
