const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    // another: './src/another-module.js'
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({title: 'Production'}),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // Specify the common bundle's name.
    // })
  ],
  output:{
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  }
};