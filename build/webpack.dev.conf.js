var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var WriteFilePlugin = require('write-file-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// entry: {
//   vendors: [
//     ],
//   test_post_form: path.resolve("dev", "post-form", "main.js"),
//   test_simple: path.resolve("dev", "simple", "main.js"),
//   meta: path.resolve("dev", "meta", "main.js"),
//   full: path.resolve("dev", "full", "main.js"),
//   mselect: path.resolve("dev", "multiselect", "main.js")
// },
//
// output: {
//   path: path.resolve(__dirname, './dev'),
//   filename: "[name].entry.js",
//   publicPath: "/"
// },

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.js',
    meta: './dev/meta/main.js',
    test_post_form: './dev/post-form/main.js',
    test_simple: './dev/simple/main.js',
    // full: './dev/full/main.js',
    mselect: './dev/multiselect/main.js'
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new WriteFilePlugin()
  ]
})
