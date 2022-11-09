<template>
  <div class="user">
    <div class="search">
      <SearchForm
        :searchFormConfig="searchFormConfig"
        :btnToTop="'75px'"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      />
    </div>
    <div class="content">
      <PageContent
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        page-name="user"
        @newBtnClick="handleNewData('新增用户')"
        @editBtnClick="handleEditData($event, '编辑用户')"
      >
        <template #status="scope">
          <el-tag :type="scope.row.enable ? 'success' : 'danger'" effect="dark">
            {{ scope.row.enable ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </PageContent>
    </div>
    <PageModal
      ref="pageModalRef"
      :modalFormConfig="modalFormConfigRef"
      :defaultInfo="defaultInfo"
      :title="title"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import SearchForm from '@/components/searchForm'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'
import { searchFormConfig } from './config/user.config'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: { SearchForm, PageContent, PageModal },

  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // 处理密码逻辑
    const newCallBack = () => {
      //todo
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem && (passwordItem.isHidden = false)
    }
    const editCallBack = () => {
      // todo
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem && (passwordItem.isHidden = true)
    }
    // 动态添加部门和角色列表
    const store = useStore()

    const modalFormConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem &&
        (departmentItem.options = store.state.entireDepartment.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        }))
      const roleItem = modalFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem &&
        (roleItem.options = store.state.entireRole.map((item) => {
          return {
            label: item.name,
            value: item.id
          }
        }))
      return modalFormConfig
    })

    // 调用hook获取公共的变量和函数
    const { title, pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(newCallBack, editCallBack)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      modalFormConfigRef,
      pageModalRef,
      defaultInfo,
      title,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData
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
    border-top: 20px solid #f5f5f5;
  }
}
</style>
