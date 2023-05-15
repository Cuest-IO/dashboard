const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const dartSass = require('dart-sass');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.common.js');

// DEVELOPMENT конфигурация
module.exports = merge(common, {
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
