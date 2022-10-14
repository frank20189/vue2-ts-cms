import HYRequest from './request'
import { ElMessage } from 'element-plus'
const hyRequest = new HYRequest({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 10000,
  showLoading: true,
  interceptors: {
    requestInterceptors: (config) => {
      const token = 'test'
      // 目前的解决方法如下
      if (config && config.headers && token) {
        config.headers.Authorization = token
      }

      return config
    },
    responseInterceptorCatch: (error) => {
      return error
    },
    responseInterceptors: (response) => {
      return new Promise((resolve, reject) => {
        if (response.status === 200) {
          resolve(response)
        } else {
          ElMessage.warning(response.data.message)
          reject(response)
        }
      })
    }
  }
})

export default hyRequest
