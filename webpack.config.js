var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('stylesheet/[name].css');
var extractLESS = new ExtractTextPlugin('stylesheet/[name].less');
var path = require('path');
var webpack = require('webpack');
var config = {
  entry: './src/index.ts',
  output: {
    path: './lib',
    filename: 'index.js',
  },

  devServer: {
    inline: true,
    port: 7777
  },
  devtool: "#cheap-source-map",

  module: {
    loaders: [{
        test: /\.ts$/,
        loader: 'ts-loader'
      }, {
        extensions: ['json'],
        test: /\.(json)(\?.*)?$/,
        loader: 'json-loader'
      },
      {
        extensions: ['coffee'],
        test: /\.(coffee)(\?.*)?$/,
        loader: 'coffee-redux-loader'
      },
      {
        extensions: ['json5'],
        test: /\.(json5)(\?.*)?$/,
        loader: 'json5-loader'
      },
      {
        extensions: ['txt'],
        test: /\.(txt)(\?.*)?$/,
        loader: 'raw-loader'
      },
      {
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg'],
        test: /\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        loader: 'url-loader?limit=10000'
      },
      {
        extensions: ['woff', 'woff2'],
        test: /\.(woff|woff2)(\?.*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        extensions: ['ttf', 'eot'],
        test: /\.(ttf|eot)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        extensions: ['wav', 'mp3'],
        test: /\.(wav|mp3)(\?.*)?$/,
        loader: 'file-loader'
      },
      {
        extensions: ['html'],
        test: /\.(html)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        extensions: ['md', 'markdown'],
        test: /\.(md|markdown)(\?.*)?$/,
        loaders: ['html-loader', 'markdown-loader']
      },
      {
        extensions: ['less', 'css'],
        test: /\.(less|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css!less')
      }]
  },
  resolve: {
    // extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    extractCSS,
    extractLESS
  ]
}

module.exports = config;