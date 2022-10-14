import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'
import type { HYRequestConfig, HYRequestInterceptors } from './types'
interface ResponseResult<T> {
  success: boolean
  returnCode: string
  data: T
}
const DEFALT_LOADING = true
class HYRequest {
  intstance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance
  constructor(config: HYRequestConfig) {
    // 常见axios实例
    this.intstance = axios.create(config)
    // 保存基本信息
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
        return new Promise((resolve, reject) => {
          if (data.returnCode === '-1001') {
            console.log('请求失败')
            reject(response)
          } else {
            resolve(response)
          }
        })
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

  request<T, D = ResponseResult<T>>(config: HYRequestConfig): Promise<D> {
    // 单个请求对请求拦截器的处理
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }
      // 设置单个请求是否显示Loading组件
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.intstance
        .request<D>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res)
          }
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
        .finally(() => {
          this.showLoading = DEFALT_LOADING
        })
    })
  }
  get<T>(config: HYRequestConfig): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: HYRequestConfig): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
  patch<T>(config: HYRequestConfig): Promise<ResponseResult<T>> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
