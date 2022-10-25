import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { upperFirst } from 'lodash'
import { getPageListData } from '@/service/main/system/system'

// 定义pageUrl映射
const pageUrlMap = {
  user: '/users/list',
  role: '/role/list'
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  mutations: {
    setData(state, payLoad) {
      Object.keys(state).forEach((item: string) => {
        state[item as keyof ISystemState] = payLoad[item]
      })
    },
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List` as keyof ISystemState]
      }
    },
    pageCountTotal(state) {
      return (pageName: string) => {
        return state[`${pageName}Count` as keyof ISystemState]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad: any) {
      // 获取对应的url，以及queryInfo
      const { pageName, queryInfo } = payLoad

      // 获取pageUrl
      const pageUrl = pageUrlMap[pageName as keyof typeof pageUrlMap]

      // 发送请求
      const pageResult = await getPageListData(pageUrl, queryInfo)
      const { list, totalCount } = pageResult.data

      // 将数据存储在state中
      commit(`change${upperFirst(pageName)}List`, list)
      commit(`change${upperFirst(pageName)}Count`, totalCount)
    }
  }
}
export default systemModule
