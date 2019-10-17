// 设置环境变量
const modeUrlObj = {
  'production': {
    baseURL: 'http://127.0.0.1:8080/api/',
  },
  'development': {
    baseURL: 'http://127.0.0.1:8080/api/',
  },
  'test': {
    baseURL: 'http://127.0.0.1:8080/test/',
  }
}

// 格式化时间
const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join(':')
}

const formatDate = (date) => {
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

const env = process.env.NODE_ENV

let currentEnv

function configEnv() {
  if (env === 'production') {
    currentEnv = modeUrlObj.production
  } else if (env === 'test') {
    currentEnv = modeUrlObj.test
  } else {
    currentEnv = modeUrlObj.production
  }
}

configEnv()

export default currentEnv
