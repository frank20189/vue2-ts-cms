<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <!-- <span> 新建用户 </span> -->
      <CustomForm
        v-bind="modalFormConfig"
        v-model="formData"
        ref="CustomFormRef"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import CustomForm from '@/base/form'
export default defineComponent({
  components: { CustomForm },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // todo
    const CustomFormRef = ref<InstanceType<typeof CustomForm>>()
    const dialogVisible = ref<boolean>(false)
    const formData = ref<any>({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    return {
      dialogVisible,
      formData,
      CustomFormRef
    }
  }
})
</script>

<style lang="less" scoped>
.page-modal {
}
</style>
