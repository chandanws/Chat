import {
  post,
  get
} from '../utils/axios'

export const getUser = () => get('/getUser')

export const login = (data) => post('/login', data)
export const getUserInfo = () => get('/getUserInfo')
