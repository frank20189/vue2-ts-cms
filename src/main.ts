import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/service'
import 'element-plus/dist/index.css'

interface Data {
  banner: any
  dKeyword: any
  keywords: any
  recommend: any
}

request
  .get<Data>({
    url: '/home/multidata',
    params: {
      id: 11
    },
    showLoading: true
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
