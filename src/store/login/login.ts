import { Module } from 'vuex'
import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import router from '@/router'
import { mapMenusToPermission, mapMenusToRoutes } from '@/utils/mapMenus'

// ================类型==================
import { IRootState } from '../types'
import { ILogonState, ILoginStateKey } from './types'
import { IAccount, IUserInfo, IUserMenuInfo } from '@/service/login/type'

const loginModule: Module<ILogonState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {} as unknown as IUserInfo,
      userMenus: [] as unknown as IUserMenuInfo[],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    setData(state, payLoad) {
      Object.keys(state).forEach((item: string) => {
        state[item as ILoginStateKey] = payLoad[item]
      })
    },
    changeUserMenus(state, payLoad) {
      // 将routes =>router.main.children
      mapMenusToRoutes(payLoad).forEach((route) => {
        router.addRoute('main', route)
      })
      // 获取用户按钮的权限
      const permissions = mapMenusToPermission(payLoad)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payLoad: IAccount) {
      // 1、实现登录逻辑
      const {
        data: { id, token }
      } = await accountLoginRequest(payLoad)

      localCache.setCache('token', token)
      // 发送初始化的请求（完整的role/department）
      dispatch('getInitialDataAction', null, { root: true })

      // 2、请求用户信息的数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      localCache.setCache('userInfo', userInfo)

      // 获取用户菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      localCache.setCache('userMenus', userMenus)

      commit('setData', {
        token,
        userInfo,
        userMenus
      })
      commit('changeUserMenus', userMenus)
      router.push('/main')
    },
    // 防止刷新后数据丢失问题
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        commit('setData', {
          token,
          userInfo,
          userMenus
        })
        commit('changeUserMenus', userMenus)
        dispatch('getInitialDataAction', null, { root: true }) // 在模块中调用根模块的action
      }
    }
  }
}

export default loginModule
