import type { IUserMenuInfo } from '@/service/login/type'
import type { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: IUserMenuInfo[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1、先加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  const filePath = routeFiles.keys()

  filePath.forEach((key: string) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // 2、根据获取的菜单添加routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
