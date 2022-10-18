import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
app.use(router)
setupStore()

app.mount('#app')
