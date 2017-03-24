# antd-mobile with webpack

basic webpack proj demo

### Install & Start

```shell
npm i
npm start
```

open http://localhost:8000/

### Build

```
npm run build
```


### 如何安装热替换
1) 在根目录新建一个Babel的配置文件:  `.babelrc` 文件。
2) 安装 `npm install babel-plugin-react-transform babel-preset-react-hmre react-transform-hmr --save-dev`
3) `.babelrc` 文件配置如下:
```
{
  	"presets": [
  		"react",
  		"es2015",
  	 	"stage-0"
  	],
	"env": {
		"development": {
			"presets": ["react-hmre"]
		}
	},
  	"plugins": [
        "transform-decorators-legacy",
        "transform-class-properties"
    ]
}
```

4) 修改 webpack.config.js， 如下:
    #####首先先注释
```
{
        test: /\.jsx$/, exclude: /node_modules/,
        loader: 'babel',
        query: {
          // presets: ['es2015', 'stage-0', 'react']   //注释此段代码，因为在`.babelrc` 文件已配置
        }
}
```
   #####配置webpack server
```
    output: {
       ...
    },
    devServer: {
        hot: true,
        inline: true,
        progress: true
    },
    resolve: {
        .....
    },
```

5) 修改package.json
   ```
    "scripts": {
       "start": "webpack-dev-server --host 0.0.0.0 --hot --progress --profile --colors --port 8000",
       "build": "webpack -p --progress --colors"
     },
   ```





