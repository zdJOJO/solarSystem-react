/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-23 21:36:05
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 12:07:46
 * @FilePath: \wepack-v4\config\webpack.common.js
 */
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
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

const postcss = require('../postcss.config');
const APP_PATH = path.resolve(__dirname, "../src");

// 是否是生产模式
const isProd = process.env.NODE_ENV === 'production';

const cssLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

module.exports = {

  mode: isProd ? 'production' : 'development',

  devtool: isProd ? 'cheap-module-eval-source-map' : 'source-map',

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", '.web.js', '.css', '.less', '.svg'], // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': path.join(__dirname, '../src'),
      'react-dom': '@hot-loader/react-dom'
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /^node_modules$/,
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /^node_modules$/,
      },
      {
        test: /\.css$/,
        use: [
          cssLoader,
          "css-loader",
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: postcss.plugins,
          //   }
          // },
        ]
      },
      {
        test: /\.less$/,
        use: [
          cssLoader,
          'css-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: postcss.plugins
          //   }
          // },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          },

        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
          fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
          name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
          outputPath: path.join(__dirname, '../dist/images'), // 输出路径
        }
      },
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],

    runtimeChunk: {
      name: 'manifest'
    },

    splitChunks: {
      chunks: 'async', //默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
      minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
      minChunks: 1,  // 表示被引用次数，默认为1；
      maxAsyncRequests: 5,  //所有异步请求不得超过5个
      maxInitialRequests: 3,  //初始话并行请求不得超过3个
      automaticNameDelimiter: '~',//名称分隔符，默认是~
      name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      cacheGroups: {

        //node_modules内的依赖库
        vendors: {
          name: "vendor",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: -10,
        },

        // 处理异步chunk
        'async-vendors': {
          name: 'async-vendors',
          chunks: 'async',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2
        },

        // ‘src/js’ 下的js文件
        common: {
          chunks: "all",
          test: /[\\/]src[\\/]js[\\/].*\.js/,//也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
          name: "common", //生成文件名，依据output规则
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        },

        // 将css提取到一个CSS中
        styles: {
          name: 'styles',
          test: /\.(sass|scss|css|less)$/,
          chunks: 'all',    // merge all the css chunk to one file
          enforce: true,
          reuseExistingChunk: true,
        }
      }
    },
    noEmitOnErrors: true  // 在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源
  },

  plugins: [
    ...otherPlugins
  ]
}