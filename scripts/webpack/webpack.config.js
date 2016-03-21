import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import { join } from 'path';

const { HOST, PORT } = process.env;

export default {

  context: join(__dirname, '/../../src'),

  entry: {
    bundle: [
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      'webpack/hot/dev-server',
      './index.js',
    ],
  },

  output: {
    path: '/build/',
    filename: '[name].js',
    publicPath: `http://${HOST}:${PORT}/build/`,
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loaders: ['babel'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss?parser=postcss-scss'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(woff|svg|eot|ttf|woff2)$/,
        loader: 'file?name=[sha512:hash:base64:7].[ext]',
      },
    ],
  },
  postcss() {
    return [
      autoprefixer,
      precss,
    ];
  },

  resolve: {
    modules: [
      'node_modules',
    ],

    extensions: ['', '.js', '.jsx', '.json', '.sass'],

  },

  node: {
    process: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],

  debug: true,

  devtool: 'eval-source-map',

};
