<template>
  <div class="role">
    <div class="search">
      <SearchForm
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></SearchForm>
    </div>
    <div class="content">
      <PageContent
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        page-name="role"
        handerButtonName="新增角色"
        @newBtnClick="handleNewData('新增角色')"
        @editBtnClick="handleEditData($event, '编辑角色')"
      ></PageContent>
    </div>
    <PageModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalFormConfig="modalFormConfig"
      :title="title"
      @addNewData="handleAddNewData"
      @editData="handleEditDataAction"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          @check="handleCheckChange"
        />
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts">
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import SearchForm from '@/components/searchForm'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { mapMenuLeafKeys } from '@/utils/mapMenus'
import { useStore } from '@/store'
import { ElMessage, ElTree } from 'element-plus'
import { defineComponent, computed, ref, nextTick } from 'vue'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: {
    PageContent,
    SearchForm,
    PageModal
  },
  name: 'role',
  setup() {
    const store = useStore()
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    const authList = ref({})
    const menus = computed(() => store.state.entireMenu)
    const newCallBack = () => {
      //todo
      const idItem = modalFormConfig.formItems.find(
        (item) => item.field === 'id'
      )

      // select下拉框选择器对应回显
      idItem && (idItem.isHidden = true)
    }
    const editCallBack = (value: any) => {
      // todo
      const leafKeys = mapMenuLeafKeys(value.menuList)
      const idItem = modalFormConfig.formItems.find(
        (item) => item.field === 'id'
      )
      idItem && (idItem.isHidden = true)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const { pageModalRef, defaultInfo, title, handleNewData, handleEditData } =
      usePageModal(newCallBack, editCallBack)

    const handleAddNewData = (value: any) => {
      store
        .dispatch('systemModule/createPageDataAction', {
          pageName: 'role',
          newData: { ...value, ...authList.value }
        })
        .then(() => {
          ElMessage.success('添加成功')
        })
    }
    const handleEditDataAction = (value: any) => {
      store
        .dispatch('systemModule/editPageDataAction', {
          pageName: 'role',
          editData: { ...value, ...authList.value },
          id: value.id
        })
        .then(() => {
          ElMessage.success('编辑成功')
        })
    }

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      authList.value = { menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      modalFormConfig,
      pageModalRef,
      defaultInfo,
      title,
      menus,
      authList,
      elTreeRef,
      handleNewData,
      handleEditData,
      handleResetClick,
      handleQueryClick,
      handleAddNewData,
      handleEditDataAction,
      handleCheckChange
    }
  }
})
</script>

<style lang="less" scoped>
.role {
  .search {
    padding-right: 24px;
  }
  .content {
    border-top: 20px solid #f5f5f5;
  }
  .menu-tree {
    width: 100%;
    // text-align: center;
    padding: 0 20px;
  }
}
</style>
