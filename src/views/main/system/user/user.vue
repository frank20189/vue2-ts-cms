<template>
  <div class="user">
    <div class="search">
      <SearchForm :searchFormConfig="searchFormConfig" :btnToTop="'75px'" />
    </div>
    <div class="content">
      <el-table :data="userList" border stripe style="width: 100%">
        <template v-for="item in propList" :key="item.prop">
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
            :align="item.align"
          ></el-table-column>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { searchFormConfig } from './config/user.config'
import SearchForm from '@/components/searchForm'
import { useStore } from '@/store'
export default defineComponent({
  name: 'user',
  components: { SearchForm },

  setup() {
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
      { prop: 'enable', label: '状态', minWidth: '100', align: 'center' },
      { prop: 'createAt', label: '创建时间', minWidth: '250', align: 'center' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250', align: 'center' }
    ]
    return { searchFormConfig, userList, userCount, propList }
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
