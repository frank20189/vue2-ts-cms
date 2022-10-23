import { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import registerProperties from './registerProperties'
const iconNameList: string[] = []
export function registerApp(app: App) {
  // 注册elementplus图标组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    iconNameList.push(key)
    app.component(key, component)
  }
  registerProperties(app)
}

export { iconNameList }
