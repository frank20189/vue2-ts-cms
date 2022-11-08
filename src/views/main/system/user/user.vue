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
        @newBtnClick="handleNewData"
        @editBtnClick="handleEditData"
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
      :modalFormConfig="modalFormConfig"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import SearchForm from '@/components/searchForm'
import { usePageModal } from '@/hooks/usePageModal'
import { usePageSearch } from '@/hooks/usePageSearch'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'
import { searchFormConfig } from './config/user.config'

export default defineComponent({
  name: 'user',
  components: { SearchForm, PageContent, PageModal },

  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      modalFormConfig,
      pageModalRef,
      defaultInfo,
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
