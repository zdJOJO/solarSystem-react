/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-21 00:44:32
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-03 20:21:05
 * @FilePath: \solarSystem-react\config\webpack.dll.js
 */
const path = require("path");
const webpack = require("webpack");

const vendors = [
  // "antd-mobile/lib", 已经按需加载
  "axios",
  "moment",
  "rc-form",
  "react",
  "react-router-dom",
  "react-dom"
];

module.exports = {
  entry: {
    vendor: vendors
  },
  output: {
    path: path.resolve(__dirname, "../dist/js"), //文件的输出路径
    filename: "[name].dll.reactV.js", // 输出的js文件名
    library: "[name]_library"
  },
  plugins: [


    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // 把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dist/manifest.json"), // path是manifest文件的输出路径
      name: "[name]_library", //name是dll暴露的对象名，要跟output.library保持一致
      context: __dirname //context是解析包路径的上下文，这个要跟接下来配置的dll user一致
    }),

    // 压缩
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, // 最紧凑的输出
      comments: false, //去掉注释
      compress: {
        warnings: false, //忽略警告,要不然会有一大堆的黄色字体出现
        drop_console: true, // 删除所有的 `console` 语句
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
      },
      except: ["$super", "$", "exports", "require"] //排除关键字
    }),

    //调整模块的打包顺序，用到次数更多的会出现在文件的前面
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};