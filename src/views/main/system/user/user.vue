<template>
  <div class="user">
    <div class="search">
      <CustomForm v-bind="searchFormConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import CustomForm from '@/base/form'
import { defineComponent } from 'vue'
import { searchFormConfig } from './config/user.config'

export default defineComponent({
  name: 'user',
  components: { CustomForm },
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
