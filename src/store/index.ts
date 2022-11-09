import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'liming',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // todo
      // 1、请求部门和角色数据
      const {
        data: { list: departmentList }
      } = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const {
        data: { list: roleList }
      } = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      // 保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList) {
      state.entireRole = roleList
    }
  },
  getters: {},
  modules: {
    loginModule,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
