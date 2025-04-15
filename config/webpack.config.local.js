import path from 'path';
import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dartSass from 'dart-sass';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import common from './webpack.common.js';

export default merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, `../${process.env.FOLDER_PUBLIC_BASE}`),
    },
    compress: true,
    port: 9003,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {},
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: dartSass,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LiveReloadPlugin(),
  ],
});
