/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 01:47:57
 * @FilePath: \wepack-v4\config\webpack.dev.js
 */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const port = 3001;

module.exports = merge(common, {

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    "webpack/hot/only-dev-server",
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js')  // 入口文件
  ],

  output: {
    path: path.join(__dirname, '../dist/js'),
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },

  devServer: {
    host: "127.0.0.1",
    port: port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    // proxy: {
    //   "/api/*": "http://127.0.0.1:7000"
    // }
  },

  plugins: [

    new HtmlWebpackPlugin({
      filename: 'index.html', // 设置生成的内存页面的名称
      title: '我的reactAPP',
      template: path.join(__dirname, '../index.html'), // 指定模板文件路径
    }),

    new webpack.HotModuleReplacementPlugin()

  ]

});