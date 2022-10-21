<template>
  <div class="user">
    <div class="search">
      <SearchForm :searchFormConfig="searchFormConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { searchFormConfig } from './config/user.config'
import SearchForm from '@/components/searchForm'

export default defineComponent({
  name: 'user',
  components: { SearchForm },

  setup() {
    return { searchFormConfig }
  }
})
</script>

<style scoped lang="less">
.user {
  padding-right: 24px;
}
</style>
