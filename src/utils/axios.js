import axios from 'axios'
import { messageup } from '../utils/setmessage.js'
import router from '../router'

// 如果配置了代理解决跨域，就不用添加这个baseURL
axios.defaults.baseURL = 'http://127.0.0.1:90/api/'
// axios.defaults.headers['Authorization'] = localStorage.getItem('token') || ''

// 判断是否为开发环境
// if (process.env.VUE_APP_ENV === 'dev') {
//   axios.defaults.baseURL = ''
// } else {
//   axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
// }

axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    if (response.data.status == 401) {
      messageup({
        type: 'error',
        message: response.data.message,
      })
      router.push('/login')
      localStorage.clear()
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
