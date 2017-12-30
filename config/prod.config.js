const merge = require('webpack-merge');
const PATHS = require('./paths');
const parts = require('./webpack.parts');

const productionConfig = merge([
  parts.setEntries({
    client: [
      'wicg-focus-ring',
      PATHS.clientBundleEntry,
    ],
    vendor: ['react', 'react-dom', 'redux'],
  }),
  parts.setOutput(PATHS.publicDirectory, true),
  parts.cleanDirectory(PATHS.mainOutputDirectory),
  parts.resolveProjectDependencies,
  parts.generateGitRevision,
  parts.loadStaticAssets('static/'),
  parts.generateServerEjsTemplate(PATHS.ejsTemplate),
  parts.transpileJavaScript,
  parts.minifyJavaScript,
  parts.generateSourceMaps('source-map'),
  parts.extractVendorModules('vendor'),
  parts.defineEnvironmentalVariables({
    NODE_ENV: JSON.stringify('production'),
  }),
  parts.copy([
    { from: './static', to: './static' },
  ]),
  parts.concatenateModulesForProduction,
]);

module.exports = productionConfig;
