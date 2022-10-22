import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import loginModule from './login/login'
import systemModule from './main/system/system'
const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'liming',
      age: 18
    }
  },
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    loginModule,
    systemModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
