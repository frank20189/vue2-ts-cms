<template>
  <div class="search-form">
    <CustomForm v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="btn-group">
          <el-button>
            <el-icon><RefreshRight /></el-icon>
            重置
          </el-button>
          <el-button type="primary">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </CustomForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CustomForm from '@/base/form'
export default defineComponent({
  name: 'SearchForm',
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    },
    btnToTop: {
      type: String,
      default: '22px'
    }
  },
  components: {
    CustomForm
  },
  setup() {
    // todo
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })
    return { formData }
  }
})
</script>

<style lang="less" scoped>
.search-form {
  position: relative;
  .btn-group {
    // text-align: right;
    // padding-bottom: 32px;
    position: absolute;
    right: 0;
    top: v-bind(btnToTop);
  }
}
</style>
