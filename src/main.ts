import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/service'
import 'element-plus/dist/index.css'

request.request({
  url: '/home/multidata',
  method: 'GET',
  params: {
    id: 11
  },
  interceptors: {
    requestInterceptors: (config) => {
      console.log('单独请求的config')
      return config
    },
    responseInterceptors: (res) => {
      return res.data
    }
  },
  showLoading: true
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
