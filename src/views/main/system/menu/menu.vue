<template>
  <div class="menu">
    <!-- <div class="search">
      <SearchForm
        :searchFormConfig="searchFormConfig"
        :btnToTop="'75px'"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      />
    </div> -->
    <div class="content">
      <PageContent
        ref="pageContentRef"
        :contentTableConfig="contentTableConfig"
        page-name="menu"
      >
        <template #header>
          <el-button type="primary">创建菜单</el-button>
        </template>
      </PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { contentTableConfig } from './config/content.config'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'menuView',
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style scoped></style>
