const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  devtool: 'cheap-module-source-map',
  devServer: {
    compress: true,
    historyApiFallback: true
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.bundle.[hash].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, 'sass-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      Actions: path.resolve(__dirname, 'src/actions/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Config: path.resolve(__dirname, 'src/config/'),
      Configurations: path.resolve(__dirname, 'src/configurations/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Selectors: path.resolve(__dirname, 'src/selectors/'),
      Util: path.resolve(__dirname, 'src/utils/')
    }
  },
  plugins: [
    new ExtractTextPlugin('index.min.[contenthash].css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
