const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const BUILD_DIR = path.resolve(__dirname, './client/build');
const APP_DIR = path.resolve(__dirname, './client/src');

const config = {
  entry: `${APP_DIR}/App/Main.jsx`,

  output: {
    path: path.join(__dirname, 'client', 'build', 'static', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css!'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015', 'es2016', 'es2017'],
          compact: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    //new webpack.optimize.DedupePlugin(),
    //new webpack.optimize.OccurenceOrderPlugin()
  ]
};
module.exports = function (options) { return merge(config, options); };