import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './types'
import { ElMessage } from 'element-plus'
class HYRequest {
  intstance: AxiosInstance
  interceptors?: HYRequestInterceptors

  constructor(config: HYRequestConfig) {
    this.intstance = axios.create(config)
    this.interceptors = config.interceptors

    // 从config拦截器中区属的拦截器是实例拦截器
    this.intstance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorCatch
    )

    this.intstance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorCatch
    )

    // 配置所有实例的拦截器
    this.intstance.interceptors.request.use((config) => {
      return config
    })
    this.intstance.interceptors.response.use(
      (response) => {
        const data = response.data

        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        if (err.response.status === '404') {
          ElMessage.error('404错误')
        }
        return err
      }
    )
  }

  request(config: HYRequestConfig) {
    if (config.interceptors?.requestInterceptors) {
      config = config.interceptors.requestInterceptors(config)
    }
    this.intstance.request(config).then(async (res) => {
      if (config.interceptors?.responseInterceptors) {
        res = await config.interceptors.responseInterceptors(res)
        console.log(res)
      }
    })
  }
}

export default HYRequest
