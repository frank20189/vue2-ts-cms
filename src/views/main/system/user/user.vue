<template>
  <div class="user">
    <div class="search">
      <SearchForm :searchFormConfig="searchFormConfig" :btnToTop="'75px'" />
    </div>
    <div class="content">
      <CustomTable :listData="userList" :propList="propList">
        <template #status="scope">
          <el-tag
            :type="scope.row.enable ? 'success' : 'danger'"
            effect="dark"
            >{{ scope.row.enable ? '启用' : '禁用' }}</el-tag
          >
        </template>
        <template #createAt="scope">
          <span>{{ formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #actions="scope">
          <el-button @click="getDetail(scope.row.id)" type="primary">
            查看
          </el-button>
          <el-button @click="getDetail(scope.row.id)" type="warning">
            编辑
          </el-button>
          <el-button @click="getDetail(scope.row.id)" type="danger">
            删除
          </el-button>
        </template>
      </CustomTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue'
import { searchFormConfig } from './config/user.config'
import { useStore } from '@/store'
import moment from 'moment'
import SearchForm from '@/components/searchForm'
import CustomTable from '@/base/table'
export default defineComponent({
  name: 'user',
  components: { SearchForm, CustomTable },

  setup() {
    // 获取全局方法
    const { formatTime } =
      getCurrentInstance()?.appContext.config.globalProperties.$filters
    // 注册store
    const store = useStore()
    // 从store中获取userList
    const userList = computed(() => store.state.systemModule.userList)
    // 从store中获取userCount
    const userCount = computed(() => store.state.systemModule.userCount)

    if (!userList.value.length) {
      store.dispatch('systemModule/getPageListAction', {
        pageUrl: '/users/list',
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100', align: 'center' },
      { prop: 'realname', label: '真实姓名', minWidth: '100', align: 'center' },
      {
        prop: 'cellphone',
        label: '电话号码',
        minWidth: '100',
        align: 'center'
      },
      {
        prop: 'enable',
        label: '状态',
        minWidth: '100',
        align: 'center',
        slotName: 'status'
      },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        align: 'center',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        align: 'center',
        slotName: 'updateAt'
      },
      {
        prop: 'actions',
        label: '操作',
        minWidth: '250',
        align: 'center',
        slotName: 'actions'
      }
    ]

    const getDetail = (id: string) => {
      console.log(id)
    }
    return {
      searchFormConfig,
      userList,
      userCount,
      propList,
      moment,
      getDetail,
      formatTime
    }
  }
})
</script>

<style scoped lang="less">
.user {
  .search {
    padding-right: 24px;
  }
  .content {
    padding-left: 24px;
    padding-top: 32px;
    padding-bottom: 32px;
    border-top: 20px solid #f5f5f5;
  }
}
</style>
