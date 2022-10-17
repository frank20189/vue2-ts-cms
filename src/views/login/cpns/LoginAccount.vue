<template>
  <div class="login-account">
    <el-form :model="account" :rules="rules" label-width="60px" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入账号" v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          placeholder="请输入密码"
          show-password
          v-model="account.password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm, ElMessage } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import rules from '../config/accountConfig'
import localCache from '@/utils/cache'

import type { ValidateFieldsError } from 'async-validator'
export default defineComponent({
  name: 'LoginAccount',
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    // accountLogin
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate(
        (valid: boolean, invalidFields: ValidateFieldsError | undefined) => {
          if (valid) {
            // console.log('submit!')
            // 判断是否要记住密码

            // 如果需要记住密码，则将密码缓存在本地缓存中，如果不需要则删除
            if (isKeepPassword) {
              // 本地缓存
              localCache.setCache('name', account.name)
              localCache.setCache('password', account.password)
            } else {
              localCache.deleteCache('name')
              localCache.deleteCache('password')
            }
            // 开始进行登录验证
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
      console.log('account login', isKeepPassword)
    }

    const resetForm = () => {
      formRef.value?.resetFields()
    }
    return {
      formRef,
      account,
      rules,
      loginAction,
      resetForm
    }
  }
})
</script>

<style lang="less" scoped>
.login-account {
  .el-form-item {
    display: flex;
    align-items: center;
  }
  .el-input {
    :deep(.el-input__wrapper) {
      padding: 8px 4px;
      .el-input__inner {
        padding-left: 8px !important;
      }
      .el-input__suffix-inner {
        margin-right: 4px;
      }
    }
  }
}
</style>
