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


# 介绍

#### 项目：solarSystem 移动网页APP  Vue版本

##### 核心技术栈：vue + vue-route + vuex


[Vue 版本](https://github.com/zdJOJO/solarSystem-vue)

[React 版本](https://github.com/zdJOJO/solarSystem-react)


# 主要框架

1. 视图框架

    ["react"](https://reactjs.org/docs/getting-started.html) :  "^16.13.1" 

    ```
    react 16 版本新增了 hook， 可以在函数式的组件中使用state， 实现颗粒组件的状态变化。 
    ```

    ["react-router-V5"](https://reacttraining.com/react-router/web/guides/philosophy) : "^5.2.0"  

    ["mobx"](https://cn.mobx.js.org/) :  "^5.15.6"
    

2. http 异步请求框架

    ["fetch"]() :  "^0.20.0"

3. UI库

    [ant-design](https://mobile.ant.design/docs/react/introduce-cn): "^2.3.3"
   
4. 打包工具

    ["webpack"](https://www.webpackjs.com/concepts/) :  "^3.8.1"


# Usage

`# step 1 安装包`

`yarn install`

`# step 2 开发环境运行 `

`yarn start`

`# step 3 生产环境项目打包`

`yarn run build`




# 如何安装热替换

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





