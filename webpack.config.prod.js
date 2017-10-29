const webpack = require('webpack');
const defaultConfig = require('./webpack.config');

defaultConfig.plugins = defaultConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
]);

defaultConfig.devtool = 'source-map';

module.exports = defaultConfig;
