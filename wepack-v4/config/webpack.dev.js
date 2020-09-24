/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-23 23:16:20
 * @FilePath: \solarSystem-react\config\webpack.dev.js
 */

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const port = 3001;

module.exports = merge(common, {

  mode: 'development',

  devtool: 'cheap-module-eval-source-map', // or 'inline-source-map',

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    "webpack/hot/only-dev-server",
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

    new webpack.HotModuleReplacementPlugin(),

    //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin()

  ]

});