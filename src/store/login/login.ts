import { Module } from 'vuex'
import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/mapMenus'

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
      userMenus: [] as unknown as IUserMenuInfo[]
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
    }
  },
  actions: {
    async accountLoginAction({ commit }, payLoad: IAccount) {
      // 1、实现登录逻辑
      const {
        data: { id, token }
      } = await accountLoginRequest(payLoad)

      localCache.setCache('token', token)
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
    loadLocalLogin({ commit }) {
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
      }
    }
  }
}

export default loginModule
