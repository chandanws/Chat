// 用户状态管理中心
import {
  login,
  signUp,
  getUserInfo
} from '@/api/user'

import {
  setUserId,
  setAccount,
  setCode
} from '@/utils/auth.js'

import {
  SET_LOGIN,
  SET_SIGNUP,
  SET_CODE,
  SET_ID,
  SET_ACCOUNT
} from './mutaion-types'

import {
  Message
} from 'element-ui'
import router from '@/router'


const user = {
  state: {
    code: '',
    id: '',
    isLogin: false,
    isSignUp: false,
    account: ''
  },
  mutations: {
    [SET_LOGIN](state, isLogin) {
      state.isLogin = isLogin
    },
    [SET_SIGNUP](state, isSignUp) {
      state.isSignUp = isSignUp
    },
    [SET_CODE](state, code) {
      state.code = code
    },
    [SET_ACCOUNT](state, account) {
      state.account = account
    },
    [SET_ID](state, id) {
      state.id = id
    }
  },
  actions: {
    Login({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          if (res.code === 0) {
            commit('SET_LOGIN', true)
            commit('SET_CODE', res.data.data.code)
            commit('SET_ID', res.data.data.id)
            commit('SET_ACCOUNT', res.data.data.account)
            setUserId(res.data.data.id)
            setCode(res.data.data.code)
            setAccount(res.data.data.account)
            Message({
              type: 'success',
              message: '登录成功！'
            })
            router.push({
              name: 'homepage',
            })
          } else if (res.code === -1) {
            Message({
              type: 'error',
              message: '账号或密码错误！'
            })
            commit('SET_LOGIN', false)
          } else {
            Message({
              type: 'error',
              message: '登录失败'
            })
            commit('SET_LOGIN', false)
          }
          resolve()
        }).catch(err => {
          Message({
            type: 'error',
            message: '登录异常'
          })
          reject(err)
        })
      })
    },

    SignUp({
      commit
    }, data) {
      return new Promise((resolve, reject) => {
        signUp(data).then(res => {
          if (res.code === 0) {
            Message({
              type: 'success',
              message: '注册成功！'
            })
            commit('SET_SIGNUP', true)
          } else {
            Message({
              type: 'error',
              message: '注册失败！'
            })
            commit('SET_SIGNUP', false)
          }
          resolve()
        }).catch(err => {
          Message({
            type: 'error',
            message: '注册异常！'
          })
          reject(err)
        })
      })
    },

    GetUserInfo({}, data) {
      return new Promise((resolve, reject) => {
        getUserInfo(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          Message({
            type: 'error',
            message: '获取信息异常'
          })
          reject(err)
        })
      })
    }
  }
}

export default user
