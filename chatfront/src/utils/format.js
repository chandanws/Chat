

// 格式化时间
export const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

export const formatDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const a = [year, month, day].map(formatNumber)

  return a[0] + '年' + a[1] + '月' + a[2] + '日'
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
