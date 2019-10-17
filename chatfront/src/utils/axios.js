import axios from 'axios'
import config from '../config/index'
import { Message } from 'element-ui'

import {
  getToken
} from './auth'

const $http = axios.create({
  baseURL: config.baseURL,
  timeout: 10000,
  withCredentials: true
})

// 请求拦截
$http.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截
$http.interceptors.response.use(
  response => {
    return response
  },
  err => Promise.resolve(err.response)
)

// 检查状态码
function checkStatus (res) {
  if (!res) {
    return {
      code: 0,
      message: 'Error: 服务器出错',
      data: {}
    }
  }
  if (res.status === 200 || res.status === 304) {
    return res.data
  }
  return {
    code: 0,
    message: `Error:${res.status} ${res.data.message || '服务器出错！'}`,
    data: res.statusText
  }
}

// 检查code值
function checkCode (res) {
  if (res.code === 0) {
    Message({
      message: res.message,
      type: 'error',
      duration: 2 * 1000
    })
    throw new Error(res.message)
  }
  return res
}

export const get = (url, params = {}) => {
  if (!url) return
  return $http({
    method: 'GET',
    url,
    params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(checkStatus).then(checkCode) // 详情
}

export const head = (url, params = {}) => {
  if (!url) return
  return $http({
    method: 'HEAD',
    url,
    params,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(checkStatus).then(checkCode)
}

export const post = (url, data = {}) => {
  if (!url) return
  return $http({
    method: 'POST',
    url,
    data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(res => {
    console.log(res)
  })
}
