const webpack = require('webpack');
const merge = require('webpack-merge');
const PATHS = require('./paths');
const parts = require('./webpack.parts');

const devConfig = merge([
  parts.setEntries({
    client: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      'wicg-focus-ring',
      PATHS.clientBundleEntry,
    ],
  }),
  parts.setOutput(PATHS.publicDirectory),
  parts.resolveProjectDependencies,
  parts.setDevServer,
  parts.lintJavaScript,
  parts.transpileJavaScript,
  parts.generateSourceMaps('cheap-module-eval-source-map'),
  parts.loadStaticAssets('static/'),
  parts.generateDevHTML(PATHS.ejsTemplate),
  parts.setExtraPlugins([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
]);

module.exports = devConfig;
