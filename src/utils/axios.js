import axios from 'axios'
import { messageup } from '../utils/setmessage.js'
import router from '../router'

axios.defaults.baseURL = 'http://127.0.0.1:90/api/'
// axios.defaults.headers['Authorization'] = localStorage.getItem('token') || ''
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
