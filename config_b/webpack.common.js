const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const ESLintPlugin = require('eslint-webpack-plugin');
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const WebpackFavicons = require('webpack-favicons');

const setProcessEnv = require('./env');
const getEntries = require('./entries');
const twigOption = require('./webpack-settings/webpack.twig.option');

function generateHTMLPlugins() {
  if (process.env.TWIG_PROCESS === 'true') {
    const search = glob.sync(`./${process.env.TWIG_TEMPLATES}/pages/**/*.twig`, {ignore: `./${process.env.TWIG_TEMPLATES}/pages/**/*html.twig`});
    search.push(`./${process.env.TWIG_TEMPLATES}/index.twig`);
    return search.map(
      dir => {
        return new HtmlWebpackPlugin({
          title: path.parse(path.dirname(dir)).name,
          filename: path.join('./', path.basename(dir).replace('.twig', '.html')), // Output
          template: dir, // Input
          inject: true,
          chunks: ["index", path.parse(path.dirname(dir)).name],
        })
      },
    );
  }
  else {
    return [];
  }
}

// Добавление ENV переменных в конфигурацию
setProcessEnv(path.join(__dirname, `../.env.${process.env.NODE_ENV}`));
module.exports = {
  entry: getEntries(),
  optimization: {
    minimize: process.env.NODE_ENV !== 'local',
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
      }),
    ],
  },
  output: {
    path: path.join(__dirname, `../${process.env.FOLDER_PUBLIC_BASE}/`),
    filename: './js/[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, `../../${process.env.FOLDER_PRIVATE_BASE}`),
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.twig$/,
        use: [
          {
            loader: "html-loader",
            options: {
              sources: false,
            },
          },
          {
            loader: 'twig-html-loader',
            options: twigOption,
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new WebpackFavicons({
      src: `./${process.env.FOLDER_PRIVATE_BASE}/${process.env.FAVICON_SRC}`,
      background: process.env.FAVICON_BACKGROUND_COLOR,
      theme_color: process.env.FAVICON_THEME_COLOR,
      icons: {
        favicons: true
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new WebpackNotifierPlugin(),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      ignoreOrder: false,
    }),
    new ESLintPlugin({
      cache: true,
      quiet: false,
    }),
    // new ErrorOverlayPlugin(),
    ...generateHTMLPlugins(),
  ],
};
