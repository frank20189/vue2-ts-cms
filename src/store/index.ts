import { createStore } from 'vuex'
import { IRootState } from './types'
import loginModule from './login/login'

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
    loginModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}
export default store
