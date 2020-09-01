/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-01 15:03:06
 * @FilePath: \solarSystem-react\src\index.js
 */

import React from 'react'
import ReactDOM from 'react-dom';
import {
  // BrowserRouter as Router
  HashRouter as Router
} from "react-router-dom";

import App from './pages/app/index';

// 当导航需要确认时执行的函数
const getUserConfirmation = (message, callback) => {
  callback(console.log(message))
}

// 用来判断本地浏览器是否支持刷新
const supportsHistory = "pushState" in window.history;




ReactDOM.render(

  <Router
    forceRefresh={supportsHistory}
    getUserConfirmation={getUserConfirmation}
  >
    <App />
  </Router>

  , document.getElementById('root')
);