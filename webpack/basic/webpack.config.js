const path = require('path');
const webpack = require('webpack');
const HtmlWepbackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'production'
          ? MiniCssExtractPlugin.loader
          :'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'url-loader',
        options: {
          publicPath: './dist',
          name: '[name].[ext]?[hash]',
          limit: 20000,
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: () => `Build Date: ${new Date().toLocaleString()}`
    }),
    new HtmlWepbackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify: process.env.NODE_ENV === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
      hash: true,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
    ? [new MiniCssExtractPlugin({ filename: `[name].css`})]
    : []),
  ],
};
