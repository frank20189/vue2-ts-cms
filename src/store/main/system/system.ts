import { IRootState } from '@/store/types'
import { Module } from 'vuex'
import { ISystemState } from './type'
import { upperFirst } from 'lodash'
import { deletePageData, getPageListData } from '@/service/main/system/system'
import { ElMessage } from 'element-plus'

// 定义pageUrl映射
const pageUrlMap = {
  user: '/users/list',
  role: '/role/list',
  good: '/goods/list',
  menu: '/menu/list'
}

// 定义删除操作的url
const pageDeleteMap = {
  user: '/users'
}

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      queryInfo: {},
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      goodList: [],
      goodCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
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
    },
    changeGoodCount(state, goodCount: number) {
      state.goodCount = goodCount
    },
    changeGoodList(state, goodList: any[]) {
      state.goodList = goodList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeQueryInfo(state, querInfo: any) {
      state.queryInfo = querInfo
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
    },
    async deletePageDataAction(context, payLoad: any) {
      // todo payLoad中需要含有pageName，通过pageName来做适配，以及id用于适配result full
      // 获取pageName与id
      const { pageName, id } = payLoad
      const pageUrl = `${
        pageDeleteMap[pageName as keyof typeof pageDeleteMap]
      }/${id}`
      // 调用删除网络请求
      const res = await deletePageData(pageUrl)
      if ((res.code as unknown as number) === 0) {
        // 在此调用获取数据接口
        await context.dispatch('getPageListAction', {
          pageName: pageName,
          queryInfo: { offset: 0, size: 10, ...context.state.queryInfo }
        })
        ElMessage.success('删除成功')
      } else {
        ElMessage.error('删除失败' + res.data)
      }
    }
  }
}
export default systemModule
