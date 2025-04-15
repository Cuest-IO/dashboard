import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import dartSass from 'dart-sass';
import TerserPlugin from 'terser-webpack-plugin';
import common from './webpack.common.js';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

// PRODUCTION конфигурация
export default merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
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
            options: {
              sourceMap: false,
            },
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
});
