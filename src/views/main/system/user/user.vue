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
      @addNewData="handleAddNewData"
      @editData="handleEditDataAction"
    />
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import SearchForm from '@/components/searchForm'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { useStore } from '@/store'
import { ElMessage } from 'element-plus'
import { computed, defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'
import { searchFormConfig } from './config/user.config'

export default defineComponent({
  name: 'user',
  components: { SearchForm, PageContent, PageModal },

  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    const store = useStore()

    // 处理密码逻辑
    const newCallBack = () => {
      //todo
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem && (passwordItem.isHidden = false)
    }
    const editCallBack = (payload: any) => {
      // todo
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      const idItem = modalFormConfig.formItems.find(
        (item) => item.field === 'id'
      )

      // select下拉框选择器对应回显
      const departmentDetail = store.state.entireDepartment.find(
        (item) => item.id === payload.departmentId
      )
      const roleDetail = store.state.entireRole.find(
        (item) => item.id === payload.roleId
      )
      // 处理映射关系
      payload.departmentId = departmentDetail.name
      payload.roleId = roleDetail.name
      passwordItem && (passwordItem.isHidden = true)
      idItem && (idItem.isHidden = true)
    }
    // 动态添加部门和角色列表

    const modalFormConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem &&
        (departmentItem.options = store.state.entireDepartment.map((item) => {
          return {
            label: item.name,
            value: item.name
          }
        }))
      const roleItem = modalFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem &&
        (roleItem.options = store.state.entireRole.map((item) => {
          return {
            label: item.name,
            value: item.name
          }
        }))
      return modalFormConfig
    })

    // 调用hook获取公共的变量和函数
    const { title, pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(newCallBack, editCallBack)

    const nameMapToId = (value: any) => {
      const departmentDetail = store.state.entireDepartment.find(
        (item) => item.name === value.departmentId
      )
      const roleDetail = store.state.entireRole.find(
        (item) => item.name === value.roleId
      )
      value.departmentId = departmentDetail.id
      value.roleId = roleDetail.id
    }
    const handleAddNewData = (value: any) => {
      nameMapToId(value)
      store
        .dispatch('systemModule/createPageDataAction', {
          pageName: 'user',
          newData: { ...value }
        })
        .then(() => {
          ElMessage.success('添加成功')
        })
    }
    const handleEditDataAction = (value: any) => {
      nameMapToId(value)
      store
        .dispatch('systemModule/editPageDataAction', {
          pageName: 'user',
          editData: { ...value },
          id: value.id
        })
        .then(() => {
          ElMessage.success('编辑成功')
        })
    }
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
      handleEditData,
      handleAddNewData,
      handleEditDataAction
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
