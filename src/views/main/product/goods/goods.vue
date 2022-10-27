<template>
  <div class="goods">
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
        page-name="good"
      >
        <template #header>
          <el-button type="primary">新建商品</el-button>
        </template>
        <template #status="scope">
          <el-tag
            :type="scope.row.status ? 'success' : 'danger'"
            effect="dark"
            >{{ scope.row.status ? '启用' : '禁用' }}</el-tag
          >
        </template>
        <template #imgUrl="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.imgUrl" />
        </template>
        <template #oldPrice="scope">
          {{ '¥' + scope.row.oldPrice }}
        </template>
        <template #newPrice="scope">
          {{ '¥' + scope.row.newPrice }}
        </template>
      </PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  name: 'goods',
  components: {
    PageContent
  },
  setup() {
    return { contentTableConfig }
  }
})
</script>

<style lang="less" scoped>
.good {
  .search {
    padding-right: 24px;
  }
  .content {
    border-top: 20px solid #f5f5f5;
  }
}
</style>
