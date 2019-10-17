// 使用localStorage存储token

export const setToken = (data) => localStorage.setItem('token', data)
export const removeToken = () => localStorage.removeItem('token')
export const getToken = () => localStorage.getItem('token')

export const setUserId = (data) => localStorage.setItem('userId', data)
export const removeUserId = () => localStorage.removeItem('userId')
export const getUserId = () => localStorage.getItem('userId')
