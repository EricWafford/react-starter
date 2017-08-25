const webpack = require('webpack');
const PATHS = require('./paths');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const devConfig = merge([
  parts.setEntries({
    client: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
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
  parts.generateDevHTML('./config/index.ejs'),
  parts.defineEnvironmentalVariables({
    HOST: JSON.stringify('http://localhost:8080/'),
  }),
  parts.setExtraPlugins([
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
]);

const productionConfig = merge([
  parts.setEntries({
    client: PATHS.clientBundleEntry,
  }),
  parts.setOutput(PATHS.publicDirectory),
  parts.cleanDirectory(PATHS.mainOutputDirectory),
  parts.resolveProjectDependencies,
  parts.attachGitRevision,
  parts.loadStaticAssets('static/'),
  parts.generateServerEjsTemplate(PATHS.ejsTemplate),
  parts.transpileJavaScript,
  parts.minifyJavaScript,
  parts.generateSourceMaps('cheap-module-source-map'),
  parts.defineEnvironmentalVariables({
    NODE_ENV: JSON.stringify('production'),
    HOST: JSON.stringify('http://test-app.com/'),
  }),
  parts.copy([
    { from: './static', to: './static' },
  ]),
  parts.setExtraPlugins([
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]),
]);

const serverConfig = merge([
  {
    target: 'node',
    node: {
      __filename: false,
      __dirname: false,
    },
  },
  parts.setEntries({
    server: PATHS.serverBundleEntry,
  }),
  parts.setOutput(PATHS.mainOutputDirectory),
  parts.resolveProjectDependencies,
  parts.transpileJavaScript,
  parts.loadStaticAssets('public/static/'),
  parts.generateSourceMaps('source-map'),
  parts.skipExternalLibrariesForServerBundle,
  parts.attachGitRevision,
  parts.defineEnvironmentalVariables({
    NODE_ENV: JSON.stringify('production'),
    HOST: JSON.stringify('http://localhost:8080/'),
  }),
  parts.setExtraPlugins([
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]),
]);


module.exports = (env) => {
  if (!env || env.development) { // !env - return default config for eslint-plugin-resolver-webpack
    console.log('Using webpack DEVELOPMENT config');
    return devConfig;
  }

  if (env.production) {
    console.log('Using webpack PRODUCTION config');
    return productionConfig;
  }

  if (env.server) {
    console.log('Using webpack SERVER config');
    return serverConfig;
  }

  throw new Error('Unknown env configuration passed');
};
