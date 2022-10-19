import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/dist/index.css'
import { registerApp } from '@/global'
const app = createApp(App)
registerApp(app)
app.use(store)
app.use(router)
setupStore()

app.mount('#app')
