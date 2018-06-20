const path = require('path');
const config = require('./package.json');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

require('dotenv').config();

const PROD = process.env.NODE_ENV === 'production';

let plugins = [];

let minimizers = [];

PROD ? [
    minimizers.push(new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      }))
  ] : '';

module.exports = {
  entry: path.resolve(__dirname, config.main),
  devtool: 'source-map',
  output: {
    library: 'consenticus',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: (PROD) ? 'consenticus.min.js' : 'consenticus.js',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {test: /(\.jsx|\.js)$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  plugins: plugins,
  optimization: {
      minimizer: minimizers
  }
};
