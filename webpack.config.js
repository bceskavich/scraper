var webpack = require('webpack');

module.exports = {
  entry: './app/src/app.js',
  output: {
    path: __dirname + '/app/static/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
