import {
  post,
  get
} from '@/utils/axios'

export const getFriendList = (data) => get('/friend/get/friend/list', data)
export const getFriendInfo = (data) => get('/friend/get/friend/info', data)

export const addFriend = (data) => post('/friend/add/friend', data)
