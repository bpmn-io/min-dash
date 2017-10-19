const path = require('path');

const webpack = require('webpack');


module.exports = {
  entry: {
    'min-dash': [ './index.js' ],
    'min-dash.min': [ './index.js' ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [ 'env', { loose: true, modules: false } ]
          ]
        }
      }
    ]
  },
  node: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'MinDash',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      parallel: true
    })
  ],
  devtool: 'source-map'
};
