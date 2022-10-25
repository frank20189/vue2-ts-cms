<template>
  <div class="page-content">
    <CustomTable
      :list-data="listData"
      :prop-list="contentTableConfig.propList"
      :show-index-column="contentTableConfig.showIndexColumn"
      :show-select-column="contentTableConfig.showSelectColumn"
      :title="contentTableConfig.title"
      @selection-change="handleSelectChange"
    >
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
        <el-button type="primary" link>
          <el-icon style="font-size: 18px">
            <Refresh />
          </el-icon>
        </el-button>
      </template>

      <template #status="scope">
        <el-tag :type="scope.row.enable ? 'success' : 'danger'" effect="dark">{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-tag>
      </template>
      <template #createAt="scope">
        <span>{{ formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <el-button link type="primary">
          <el-icon>
            <Edit />
          </el-icon>
          编辑
        </el-button>
        <el-button type="danger" link>
          <el-icon>
            <Delete />
          </el-icon>
          删除
        </el-button>
      </template>
    </CustomTable>
  </div>
</template>

<script lang="ts">
import CustomTable from '@/base/table'
import { useStore } from '@/store'
import { computed, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['handleSelectChange'],
  components: {
    CustomTable
  },
  setup(props) {
    const { formatTime } =
      getCurrentInstance()?.appContext.config.globalProperties.$filters
    // 注册store
    const store = useStore()

    //通过getters
    const listData = computed(() =>
      store.getters[`systemModule/pageListData`](props.pageName)
    )
    const pageCount = computed(() =>
      store.getters[`systemModule/pageCountTotal`](props.pageName)
    )

    if (!listData.value.length) {
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
    const handleSelectChange = (value: any) => {
      console.log(value)
    }
    return { formatTime, listData, pageCount, handleSelectChange }
  }
})
</script>

<style lang="less" scoped>
.page-content {
}
</style>
