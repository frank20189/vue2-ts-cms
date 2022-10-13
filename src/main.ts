import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/service'

request.request({
  url: '/home/multidata',
  method: 'GET'
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
