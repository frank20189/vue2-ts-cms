import { AxiosRequestConfig, AxiosResponse } from 'axios'
import HYRequest from './request'

const hyRequest = new HYRequest({
  baseURL: process.env.VUE_APP_BASEURL,
  timeout: 10000,
  interceptors: {
    requestInterceptors: (config: AxiosRequestConfig) => {
      console.log('请求拦截器')
      return config
    },
    responseInterceptorCatch: (error) => {
      return error
    },
    responseInterceptors: (response: AxiosResponse) => {
      return new Promise((resolve, reject) => {
        if (response.status === 200) {
          resolve(response.data)
        } else {
          reject(response)
        }
      })
    }
  }
})

export default hyRequest
