<template>
  <div class="user">
    <div class="search">
      <SearchForm :searchFormConfig="searchFormConfig" :btnToTop="'75px'" />
    </div>
    <div class="content">
      <PageContent
        :contentTableConfig="contentTableConfig"
        page-name="user"
      ></PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import SearchForm from '@/components/searchForm'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/user.config'
export default defineComponent({
  name: 'user',
  components: { SearchForm, PageContent },

  setup() {
    return {
      searchFormConfig,
      contentTableConfig
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
