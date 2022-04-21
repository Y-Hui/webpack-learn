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
  module: {
    rules: [
      { test: /\.txt$/, type: 'asset/source' },
      { test: /\.(png|jpe?g|gif)$/, type: 'asset' },
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
