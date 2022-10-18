import HYRequest from './request'
import localCache from '@/utils/cache'
// import { ElMessage } from 'element-plus'
const hyRequest = new HYRequest({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 10000,
  showLoading: true,
  interceptors: {
    requestInterceptors: (config) => {
      const token = localCache.getCache('token') ?? ''
      // 目前的解决方法如下
      if (config && config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    responseInterceptorCatch: (error) => {
      return error
    },
    responseInterceptors: (response) => {
      return response
    }
  }
})

export default hyRequest
