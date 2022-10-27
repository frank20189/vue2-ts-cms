<template>
  <div class="page-content">
    <CustomTable
      :list-data="listData"
      :prop-list="contentTableConfig.propList"
      :show-index-column="contentTableConfig.showIndexColumn"
      :show-select-column="contentTableConfig.showSelectColumn"
      :title="contentTableConfig.title"
      :childrenProps="contentTableConfig.childrenProps"
      :data-count="pageCount"
      :showFooter="contentTableConfig.showFooter"
      v-model:page="pageInfo"
      @selection-change="handleSelectChange"
    >
      <template #headerHandler>
        <div v-if="isCreate">
          <slot name="header">
            <el-button type="primary">新建用户</el-button>
          </slot>
        </div>

        <el-button type="primary" link @click="refreshTable">
          <el-icon style="font-size: 18px">
            <Refresh />
          </el-icon>
        </el-button>
      </template>

      <!-- 固定插槽 -->
      <template #createAt="scope">
        <span>{{ formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <el-button link type="primary" v-if="isUpdate">
          <el-icon>
            <Edit />
          </el-icon>
          编辑
        </el-button>
        <el-button type="danger" link v-if="isDelete">
          <el-icon>
            <Delete />
          </el-icon>
          删除
        </el-button>
      </template>
      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </CustomTable>
  </div>
</template>

<script lang="ts">
import CustomTable from '@/base/table'
import { useStore } from '@/store'
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue'
import { userPermission } from '@/hooks/usePermission'
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

    // 获取操作权限
    const isCreate = userPermission(props.pageName, 'create')
    const isUpdate = userPermission(props.pageName, 'update')
    const isDelete = userPermission(props.pageName, 'delete')
    const isQuery = userPermission(props.pageName, 'query')

    // 双向绑定PageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData(), { deep: true })
    // 注册store
    const store = useStore()

    //通过getters从vuex中获取数据
    const listData = computed(() =>
      store.getters[`systemModule/pageListData`](props.pageName)
    )
    const pageCount = computed(() =>
      store.getters[`systemModule/pageCountTotal`](props.pageName)
    )

    const getPageData = (params: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.pageSize * (pageInfo.value.currentPage - 1),
          size: pageInfo.value.pageSize,
          ...params
        }
      })
    }
    if (!listData.value.length) {
      getPageData()
    }

    const refreshTable = () => {
      // todo
      getPageData({ offset: 0 })
    }

    const handleSelectChange = (value: any) => {
      console.log(value)
    }

    // 获取其他的动态插槽的名称
    const otherPropsSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    return {
      formatTime,
      listData,
      pageCount,
      pageInfo,
      otherPropsSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleSelectChange,
      getPageData,
      refreshTable
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
}
</style>
