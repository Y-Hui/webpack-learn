import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, { Configuration } from 'webpack'

import appPaths from './config/paths'

const configuration: Configuration = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: appPaths.distDir,
    filename: '[name].[contenthash:6].bundle.js',
  },
  resolve: {
    alias: {
      '@': appPaths.appSrc,
    },
    extensions: appPaths.moduleFileExtensions.map((ext) => `.${ext}`),
  },
  module: {
    rules: [
      { test: /\.txt$/, type: 'asset/source' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif)$/, type: 'asset' },
      { test: /\.(woff|woff2|eot|ttf)$/i, type: 'asset/resource' },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: appPaths.appHtml,
    }),
    new CleanWebpackPlugin(),
  ],
}

export default configuration
