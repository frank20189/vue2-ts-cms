<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" class="tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <div class="top-tabs">
            <el-icon><User /></el-icon>
            <span class="tabs">账号登录</span>
          </div>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <div class="top-tabs">
            <el-icon><Iphone /></el-icon>
            <span class="tabs">手机登录</span>
          </div>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control" v-show="currentTab === 'account'">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>

    <el-button type="primary" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
export default defineComponent({
  name: 'LoginPanel',
  components: { LoginAccount, LoginPhone },
  setup() {
    const isKeepPassword = ref<boolean>(true)
    // InstanceType<typeof 某个组件> 用于获取组件实例的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account')

    /**
     * 根据tabs切换判断是否是账号登录，如果是账号登录，则使用LoginAccount组件中的方法，否则是LoginPhone组件中的方法
     */
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        phoneRef.value?.loginAction()
      }
    }

    return {
      isKeepPassword,
      phoneRef,
      accountRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 200px;
  width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tabs {
    width: 100%;
    .top-tabs {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .account-control {
    margin-top: 8px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-link {
      color: #539dfd;
    }
  }
  .el-button {
    margin-top: 12px;
    width: 100%;
    padding: 18px;
  }
}
</style>
