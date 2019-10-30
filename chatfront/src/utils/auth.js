// 使用localStorage存储

export const setToken = (data) => localStorage.setItem('token', data)
export const removeToken = () => localStorage.removeItem('token')
export const getToken = () => localStorage.getItem('token')

export const setAccount = (data) => localStorage.setItem('account', data)
export const removeAccount = () => localStorage.removeItem('account')
export const getAccount= () => localStorage.getItem('account')

export const setUserId = (data) => localStorage.setItem('userId', data)
export const removeUserId = () => localStorage.removeItem('userId')
export const getUserId = () => localStorage.getItem('userId')

export const setCode = (data) => localStorage.setItem('Code', data)
export const removeCode = () => localStorage.removeItem('Code')
export const getCode = () => localStorage.getItem('Code')
