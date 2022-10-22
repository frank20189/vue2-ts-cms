import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './type'

import { getPageListData } from '@/service/main/system/system'
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      userList: [],
      userCount: 0
    }
  },
  mutations: {
    setData(state, payLoad) {
      Object.keys(state).forEach((item: string) => {
        state[item as keyof ISystemState] = payLoad[item]
      })
    }
  },
  actions: {
    async getPageListAction({ commit }, payLoad: any) {
      // 获取对应的url，以及queryInfo
      const { pageUrl, queryInfo } = payLoad

      // 发送请求
      const pageResult = await getPageListData(pageUrl, queryInfo)
      const { list, totalCount } = pageResult.data
      commit('setData', {
        userList: list,
        userCount: totalCount
      })
    }
  }
}
export default systemModule
