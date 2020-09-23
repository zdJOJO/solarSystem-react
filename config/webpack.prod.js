/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-23 22:11:57
 * @FilePath: \solarSystem-react\config\webpack.prod.js
 */

const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  devtool: 'inline-source-map', // or 'inline-source-map'

  entry: {
    "main": path.resolve(__dirname, '../src/index.js')
  },

  output: {
    path: path.join(__dirname, '../dist/js'),
    publicPath: './js/',  // publicPath：访问时文件的目录， 打包的js
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },

  plugins: [

    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    new HtmlWebpackPlugin({
      inject: true,
      minify: {               // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      title: `Solar System React`,
      filename: path.join(__dirname, "../dist/index.html"),
      favicon: path.join(__dirname, "../assets/favicon.ico"),
      template: path.join(__dirname, '../assets/templete.ejs'), // 指定模板文件路径, 使用ejs模板语法
      chunks: ["main"],  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
      insertJs: [`./js/vendor.dll.reactV.js`]
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,  // 最紧凑的输出
      comments: false,        //去掉注释
      compress: {
        warnings: false,  //忽略警告,要不然会有一大堆的黄色字体出现
        drop_console: true, // 删除所有的 `console` 语句
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
      },
      except: ["$super", "$", "exports", "require"]    //排除关键字
    }),
    new webpack.optimize.AggressiveMergingPlugin(),  //合并块

    // 和DllReferencePlugin配套使用 在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dist/manifest.json")
    })

  ]
})