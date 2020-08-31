/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-01 02:12:46
 * @FilePath: \solarSystem-react\config\webpack.dev.js
 */
const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require("html-webpack-plugin");
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

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
};

const port = 3001;

module.exports = {

  devtool: 'cheap-module-eval-source-map', // or 'inline-source-map'

  // entry: { 
  //   "index": path.resolve(__dirname, '../src/index') 
  // },

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

    new HtmlWebpackPlugin({
      filename: 'index.html', // 设置生成的内存页面的名称
      title: '我的reactAPP',
      template: path.join(__dirname, '../index.html'), // 指定模板文件路径
    }),

    new webpack.HotModuleReplacementPlugin(),

    //当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(),

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
    // new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: true }),
    ...otherPlugins
  ]
}