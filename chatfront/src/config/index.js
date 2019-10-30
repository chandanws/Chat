const BASE_API = process.env.NODE_ENV === 'production' ? '' : '/api';

const IMG_URL = 'http://localhost:3000'
const SOCKETIO = 'http://localhost:3000'

module.exports = {
  BASE_API,
  IMG_URL,
  SOCKETIO
}
