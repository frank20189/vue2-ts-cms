import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { HYRequestConfig, HYRequestInterceptors } from './types'
import { ElMessage, ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFALT_LOADING = true
class HYRequest {
  intstance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: HYRequestConfig) {
    this.intstance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFALT_LOADING
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
      if (this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '正在请求数据......',
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }

      return config
    })
    this.intstance.interceptors.response.use(
      (response) => {
        const data = response.data
        this.loading?.close()

        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
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
    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }
    this.intstance
      .request(config)
      .then(async (res) => {
        if (config.interceptors?.responseInterceptors) {
          res = await config.interceptors.responseInterceptors(res)
          console.log(res)
          // 将请求设置为true，这样不会影响下一个请求
        }
      })
      .catch((err) => {
        return err
      })
      .finally(() => {
        this.showLoading = DEFALT_LOADING
      })
  }
}

export default HYRequest
