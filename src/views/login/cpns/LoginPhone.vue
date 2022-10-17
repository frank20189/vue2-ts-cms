<template>
  <div class="login-phone">
    <el-form :model="phone" :rules="rules" ref="formRef">
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" v-model="phone.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="msg-code">
          <el-input placeholder="请输入验证码" v-model="phone.code" />
          <el-button type="primary">发送验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import rules from '../config/phoneConfig'
import { defineComponent, reactive, ref } from 'vue'
import { ValidateFieldsError } from 'async-validator'
import { ElForm, ElMessage } from 'element-plus'
export default defineComponent({
  name: 'LoginPhone',
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const phone = reactive({
      number: '',
      code: ''
    })

    // phoneLogin
    const loginAction = () => {
      formRef.value?.validate(
        (valid: boolean, invalidFields: ValidateFieldsError | undefined) => {
          if (valid) {
            console.log('submit!')
          } else {
            // 将警告信息展示
            if (invalidFields) {
              Object.values(invalidFields).forEach((item) => {
                ElMessage.warning(item[0].message)
              })
            } else {
              ElMessage.warning('输入错误')
            }
            console.log('error submit!')
          }
        }
      )
    }
    return {
      phone,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style lang="less" scoped>
.login-phone {
  .el-form-item {
    display: flex;
    align-items: center;
    .msg-code {
      display: flex;
      .el-button {
        margin-left: 8px;
        padding: 22px 11px;
      }
    }
  }
  .el-input {
    :deep(.el-input__wrapper) {
      padding: 8px 4px;
      .el-input__inner {
        padding-left: 8px !important;
      }
    }
  }
}
</style>
