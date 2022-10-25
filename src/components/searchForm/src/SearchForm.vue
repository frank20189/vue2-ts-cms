<template>
  <div class="search-form">
    <CustomForm v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="btn-group">
          <el-button @click="handleResetClick">
            <el-icon><RefreshRight /></el-icon>
            重置
          </el-button>
          <el-button type="primary" @click="handleSearchClick">
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
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // formData 应该是通过fields属性来决定的
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = undefined
    }

    const formData = ref(formOriginData)
    // 重置
    const handleResetClick = () => {
      // todo
      // formData.value = formOriginData
      Object.keys(formData.value).forEach((key) => {
        formData.value[key] = undefined
      })
      emit('resetBtnClick')
    }

    // 用户点击搜索
    const handleSearchClick = () => {
      //todo
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleSearchClick }
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
