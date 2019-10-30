import {
  post,
  get
} from '@/utils/axios'

export const getGroupList = (data) => get('/group/get/group/list', data)
export const getGroupInfo = (data) => get('/group/get/group/info', data)

export const createGroup = (data) => post('/group/create/group/', data)
export const addGroupMember = (data) => post('/group/add/group/member', data)
