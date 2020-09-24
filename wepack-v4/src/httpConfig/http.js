/*
 * @Description: 异步请求全局设置
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 22:49:22
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-02 20:13:34
 */

import axios from 'axios';

import { Toast } from 'antd-mobile';

import { BASE_URL } from './api';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000
})

// 自定义拦截器
// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response;
    } else {
      Toast.offline('网络出现问题');
      return
    }
  },
  error => {
    Toast.offline(`${error}😢`);
    return;
  });




/**
 * @description: 二次封装
 * @param {type} 
 * @return {type} 
 * @author: zdJOJO
 */

const http = {

  get: function (url, isForm = false, isMsg = false) {
    return instance.get(url)
      .then(response => {
        if (response.data.status === 0) {
          if (response.data.message.length > 0) {
            if (isMsg) {
              Toast.success(`为您跟新${response.data.message.length} 条信息 😀`, 1.5)
            }
          } else {
            Toast.info(`已无更多信息 🙂`, 1.5)
          }
          return response.data.message
        } else {
          Toast.fail(`${response.data.message} 😢`);
          return
        }
      }).catch(err => {
        Toast.fail(`请求失败${err} 😢`);
        return Promise.reject(err)
      })
  },

  post: function (url, param, isForm = false) {
    let contentType = 'application/json;charset=UTF-8';
    if (isForm) {
      contentType = 'application/x-www-form-urlencoded';
    }
    return instance.post(
      url,
      param,
      {
        headers: {
          'Content-Type': contentType
        }
      })
      .then(response => {
        if (response.data.status === 0) {
          return {
            successful: response.data.status === 0,
            msg: response.data.message
          }
        } else {
          Toast.fail(`${response.data.message} 😢`);
          return
        }
      }).catch(err => {
        Toast.fail(`请求失败${err} 😢`);
        return Promise.reject(err)
      })
  },
  delete: function () {
    // todo
  },
  put: function () {
    // todo
  }
}

export default http;