import {
  post,
  get
} from '@/utils/axios'

export const login = (data) => post('/user/login', data)
export const signUp = (data) => post('/user/signUp', data)

export const getUserInfo = (data) => get('/user/get/user/info', data)
export const modifyUserInfo = (data) => post('/user/modify/user/info', data)

export const getConversationList = (data) => get('/user/get/conversation/list', data)
