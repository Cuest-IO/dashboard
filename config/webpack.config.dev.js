import { merge } from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import dartSass from 'dart-sass';
import TerserPlugin from 'terser-webpack-plugin';
import common from './webpack.common.js';

// DEVELOPMENT конфигурация
export default merge(common, {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
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
