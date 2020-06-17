'use strict'

const { join } = require('path')
const { HotModuleReplacementPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ROOT_DIR = join(__dirname, '../..')
const resolve = p => join(ROOT_DIR, p)

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      resolve('src/main.js')
    ]
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('src/app/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: { collapseWhitespace: true }
    }),
    // These plugins will only used in development mode
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
}
