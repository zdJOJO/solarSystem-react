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

    ["axios"]() :  "^0.20.0"

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

# 存在问题
1. reac-router  history.push{path, state} 通过 state传参 无效 ？

2. 如何类似Vue watch 或者 守卫 监听路有变化？

# 知识点

1. 需要用到 AbortController, 来实现组件卸载时直接中断请求，避免组件卸载之后继续更新状态。

```
useEffect(() => {
    let isUnmounted = false;
    const abortController = new AbortController(); // 创建
    (async () => {
        const res = await fetch(SOME_API, {
            singal: abortController.singal, // 当做信号量传入
        });
        const data = await res.json();
        if (!isUnmounted) {
            setValue(data.value);
            setLoading(false);
        }
    })();
 
    return () => {
        isUnmounted = true;
        abortController.abort(); // 在组件卸载时中断
    }
```
singal 的实现依赖于实际发送请求使用的方法，如上述例子的 fetch 方法接受 singal 属性。 如果使用的是 axios，它的内部已经包含了 axios.CancelToken，可以直接使用。



2. 在使用 某子组件使用了 useEffect hook - A， 当子组件通过方法 B 向上通信，改变父组件的值， 这时候，子组件也会随之重新调用hook A。 
解决方法： 在子组件的外面包一层， React.memo(Component Child), 可防止此情况发生。

