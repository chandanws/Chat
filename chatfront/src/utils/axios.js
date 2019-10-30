import axios from 'axios'
import {
  BASE_API
} from '@/config'

// 检查状态码
function checkStatus(res) {
  if (!res) {
    return {
      code: -1,
      message: 'Error: 服务器出错',
      data: {}
    }
  }
  if (res.status === 200 || res.status === 304) {
    return res.data
  }
  return {
    code: -1,
    message: `Error:${res.status} ${res.data.message || '服务器出错！'}`,
    data: res.statusText
  }
}

export const get = (url, params = {}) => {
  if (!url) return
  return axios({
    method: 'get',
    url: BASE_API + url,
    params
  }).then(checkStatus)
}

export const head = (url, params = {}) => {
  if (!url) return
  return axios({
    method: 'head',
    url: BASE_API + url,
    params
  }).then(checkStatus)
}

export const post = (url, data = {}) => {
  return axios({
    method: 'post',
    url: BASE_API + url,
    data
  }).then(checkStatus)
}
