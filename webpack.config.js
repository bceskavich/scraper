var webpack = require('webpack');

module.exports = {
  entry: './src/app/app.js',
  output: {
    path: __dirname + '/src/static/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
