# webpack V3 和 V4 版本打包大小对比 :

## webpack V3
#### All Size ( gzip ) = 655 kB +  1.07 MB
```

Hash: 84c449f0a3ba590785fc
Version: webpack 3.12.0
Time: 4280ms
               Asset    Size  Chunks                    Chunk Names
vendor.dll.reactV.js  655 kB       0  [emitted]  [big]  vendor



Hash: e84b3d19fb5510e17294
Version: webpack 3.12.0
Time: 8142ms
                                    Asset     Size  Chunks                    Chunk Names
              goodsList.6c538f3b.chunk.js   666 kB       0  [emitted]  [big]  goodsList
               comments.76a31e1c.chunk.js   410 kB       1  [emitted]  [big]  comments
               newsInfo.33ab8417.chunk.js   310 kB       2  [emitted]  [big]  newsInfo
                   home.31c9e328.chunk.js   344 kB       3  [emitted]  [big]  home
                   cart.f4cb90c1.chunk.js   565 kB       4  [emitted]  [big]  cart
                 movies.b6eb4de1.chunk.js  17.6 kB       5  [emitted]         movies
               location.6ff1c5e1.chunk.js  5.32 kB       6  [emitted]         location
                  main.e84b3d19.bundle.js  1.49 MB       7  [emitted]  [big]  main
                                common.js  21.3 kB       8  [emitted]         common
main.efebffa515bf5b5891db55ddaec54e10.css  55.3 kB       7  [emitted]         main
                              favicon.ico  4.29 kB          [emitted]
```

## webpack V4
#### All Size ( gzip ) = 896.03 KB  
```
Hash: 0bf67d29390b5bb594db
Version: webpack 4.44.2
Time: 13594ms
Built at: 2020-09-26 12:30:27 鈹淔10: PM鈹?[39m
                          Asset      Size  Chunks                                Chunk Names
                  ..\index.html  1.08 KiB          [emitted]
                  0aad41c0b.css  14.3 KiB       0  [emitted] [immutable]         async-vendors
                  101a87bdb.css  34.8 KiB       1  [emitted] [immutable]         styles
          app.61704c83.chunk.js   235 KiB       3  [emitted] [immutable]         app
async-vendors.f6b41c79.chunk.js   459 KiB       0  [emitted] [immutable]  [big]  async-vendors
         cart.ff21674a.chunk.js  45.9 KiB       4  [emitted] [immutable]         cart
     comments.e2e269eb.chunk.js  70.3 KiB       5  [emitted] [immutable]         comments
                    favicon.ico  4.19 KiB          [emitted]
    goodsInfo.eeac13f0.chunk.js  46.1 KiB       6  [emitted] [immutable]         goodsInfo
    goodsList.b4b3716a.chunk.js  25.6 KiB       7  [emitted] [immutable]         goodsList
         home.47479d2e.chunk.js  10.6 KiB       8  [emitted] [immutable]         home
     location.02136b61.chunk.js  1.63 KiB       9  [emitted] [immutable]         location
    manifest.0bf67d29.bundle.js  3.48 KiB      10  [emitted] [immutable]         manifest
       movies.d540bbf2.chunk.js  14.5 KiB      11  [emitted] [immutable]         movies
     newsInfo.99582351.chunk.js  33.8 KiB      12  [emitted] [immutable]         newsInfo
     newsList.9cdee567.chunk.js    37 KiB      13  [emitted] [immutable]         newsList
      photoes.67f72217.chunk.js  45.9 KiB      14  [emitted] [immutable]         photoes
       styles.a7d78b54.chunk.js  10.7 KiB       1  [emitted] [immutable]         styles
         user.e400b80b.chunk.js  22.6 KiB      15  [emitted] [immutable]         user
       vendor.fa055384.chunk.js  2.39 MiB       2  [emitted] [immutable]  [big]  vendor

```




### webpack V4 运行出现问题：

```
Uncaught TypeError: init is not a function
    at mountLazyComponent (react-dom.development.js:17641)
    at beginWork (react-dom.development.js:19004)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3946)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3995)
    at invokeGuardedCallback (react-dom.development.js:4057)
    at beginWork$1 (react-dom.development.js:23998)
    at performUnitOfWork (react-dom.development.js:22918)
    at workLoopSync (react-dom.development.js:22849)
    at renderRootSync (react-dom.development.js:22812)
    at performSyncWorkOnRoot (react-dom.development.js:22435)


react-dom.development.js:20138 The above error occurred in one of your React components:

    at Lazy
    at Route (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at Switch (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at Suspense
    at main
    at MainContent (http://127.0.0.1:3001/main.ad99529a.chunk.js:782:86)
    at div
    at App (http://127.0.0.1:3001/main.ad99529a.chunk.js:1214:84)
    at AppContainer (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at HotExportedApp (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at Router (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at HashRouter (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)

React will try to recreate this component tree from scratch using the error boundary you provided, AppContainer.



TypeError: init is not a function
    at mountLazyComponent (react-dom.development.js:17641)
    at beginWork (react-dom.development.js:19004)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3946)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3995)
    at invokeGuardedCallback (react-dom.development.js:4057)
    at beginWork$1 (react-dom.development.js:23998)
    at performUnitOfWork (react-dom.development.js:22918)
    at workLoopSync (react-dom.development.js:22849)
    at renderRootSync (react-dom.development.js:22812)
    at performSyncWorkOnRoot (react-dom.development.js:22435)
error @ react-hot-loader.development.js:297
react-hot-loader.development.js:2409 Uncaught TypeError: init is not a function
    at mountLazyComponent (react-dom.development.js:17641)
    at beginWork (react-dom.development.js:19004)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3946)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3995)
    at invokeGuardedCallback (react-dom.development.js:4057)
    at beginWork$1 (react-dom.development.js:23998)
    at performUnitOfWork (react-dom.development.js:22918)
    at workLoopSync (react-dom.development.js:22849)
    at renderRootSync (react-dom.development.js:22812)
    at performSyncWorkOnRoot (react-dom.development.js:22435)
react-dom.development.js:20138 The above error occurred in the <AppContainer> component:

    at AppContainer (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at HotExportedApp (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at Router (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)
    at HashRouter (eval at ES6ProxyComponentFactory (http://127.0.0.1:3001/vendor.4623d3b6.chunk.js:28859:10), <anonymous>:14:7)

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
logCapturedError @ react-dom.development.js:20138
react-dom.development.js:11318 Uncaught TypeError: init is not a function
    at mountLazyComponent (react-dom.development.js:17641)
    at beginWork (react-dom.development.js:19004)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3946)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3995)
    at invokeGuardedCallback (react-dom.development.js:4057)
    at beginWork$1 (react-dom.development.js:23998)
    at performUnitOfWork (react-dom.development.js:22918)
    at workLoopSync (react-dom.development.js:22849)
    at renderRootSync (react-dom.development.js:22812)
    at performSyncWorkOnRoot (react-dom.development.js:22435)
    
```


