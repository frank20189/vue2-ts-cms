<template>
  <div class="login">
    <login-panel />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'
export default defineComponent({
  name: 'LoginView',
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
