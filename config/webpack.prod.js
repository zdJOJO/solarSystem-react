/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-03 02:31:44
 * @FilePath: \solarSystem-react\config\webpack.prod.js
 */
const path = require('path')
const webpack = require('webpack')


const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
};

const theme = require('../package.json').theme;

module.exports = {

  devtool: 'cheap-module-eval-source-map', // or 'inline-source-map'

  // entry: { 
  //   "index": path.resolve(__dirname, '../src/index') 
  // },

  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },

  output: {
    path: path.join(__dirname, '../dist/js'),
    publicPath: './js',  // publicPath：访问时文件的目录， 打包的js
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].[chunkhash:8].chunk.js'
  },

  resolve: {
    extensions: [".js", ".jsx", '.web.js', '.css', '.less', '.svg'], // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcssOpts
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: postcssOpts
          },
          {
            loader: 'less-loader',
            options: { modifyVars: theme }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader?limit=8192"
      },
    ]
  },

  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM"
  // },

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
      title: `Solar System React Version`,
      filename: path.join(__dirname, "../dist/index.html"),
      favicon: path.join(__dirname, "../assets/favicon.ico"),
      template: path.join(__dirname, '../assets/templete.ejs'), // 指定模板文件路径, 使用ejs模板语法
      chunks: ["app"],  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
      insertJs: [`./js/vendor_dll.js`]
    }),


    new webpack.optimize.ModuleConcatenationPlugin(),


    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'common',
      filename: 'common.js'
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

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),
    // 用于优化或者压缩CSS资源 和 ExtractTextPlugin 一起使用
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),

    // 和DllReferencePlugin配套使用 在webpack.dll.config.js中打包生成的dll文件引用到需要的预编译的依赖上来
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("../dist/manifest.json")
    }),

    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    //这样可以确保输出资源不会包含错误。
    //对于所有资源，统计资料(stat)的 emitted 标识都是 false
    new webpack.NoEmitOnErrorsPlugin()
  ]
}