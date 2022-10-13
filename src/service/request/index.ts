import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './types'
class HYRequest {
  intstance: AxiosInstance
  interceptors?: HYRequestInterceptors

  constructor(config: HYRequestConfig) {
    this.intstance = axios.create(config)
    this.interceptors = config.interceptors

    this.intstance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorCatch
    )

    this.intstance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request(config: AxiosRequestConfig) {
    this.intstance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default HYRequest
