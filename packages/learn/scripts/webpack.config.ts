import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, { Configuration } from 'webpack'
import { Configuration as DevServer } from 'webpack-dev-server'

import appPaths from './config/paths'

const ENV = (process.env.NODE_ENV || 'development') as
  | 'development'
  | 'production'

const isProduction = ENV === 'production'

const configuration: Configuration & DevServer = {
  mode: ENV,
  devtool: isProduction ? false : 'cheap-module-source-map',
  entry: appPaths.appIndexFile,
  devServer: {
    static: appPaths.distDir,
    port: 3000,
  },
  output: {
    path: appPaths.distDir,
    filename: '[name].[contenthash:6].bundle.js',
  },
  resolve: {
    alias: {
      '@': appPaths.appSrc,
    },
    modules: ['node_modules', appPaths.appNodeModules],
    extensions: appPaths.moduleFileExtensions.map((ext) => `.${ext}`),
  },
  module: {
    rules: [
      { test: /\.txt$/, type: 'asset/source' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpe?g|gif)$/, type: 'asset' },
      { test: /\.(woff|woff2|eot|ttf)$/i, type: 'asset/resource' },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        include: appPaths.appSrc,
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
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
