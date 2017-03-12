require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './public');
const APP_DIR = path.resolve(__dirname, './src');

const config = {
  entry: `${APP_DIR}/App/Main.jsx`,

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};

module.exports = config;
