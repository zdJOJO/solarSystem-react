/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-23 21:36:05
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-23 21:55:28
 * @FilePath: \solarSystem-react\config\webpack.common.js
 */
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');
const Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment.
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // remove it in production environment.
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
  new Visualizer(), // remove it in production environment.
  new BundleAnalyzerPlugin({
    defaultSizes: 'parsed',
    // generateStatsFile: true,
    statsOptions: { source: false }
  }), // remove it in production environment.
];
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const theme = require('../package.json').theme;

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
};


module.exports = {

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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: postcssOpts
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: postcssOpts
            },
            {
              loader: 'less-loader',
              options: { modifyVars: theme }
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader?limit=8192"
      },
    ]
  },

  plugins: [

    new webpack.optimize.ModuleConcatenationPlugin(),

    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    //这样可以确保输出资源不会包含错误。
    //对于所有资源，统计资料(stat)的 emitted 标识都是 false
    new webpack.NoEmitOnErrorsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'common',
      filename: 'common.js'
    }),

    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      allChunks: true
    }),

    ...otherPlugins
  ]
}