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
      ></PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import PageContent from '@/components/page-content'
import SearchForm from '@/components/searchForm'
import { usePageSearch } from '@/hooks/usePageSearch'
export default defineComponent({
  components: {
    PageContent,
    SearchForm
  },
  name: 'role',
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick
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
}
</style>
