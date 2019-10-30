import {
  post,
} from '@/utils/axios'

export const uploadFile = (data) => post('/upload/uploadFile', data)
