<template>
  <router-link to="/main">首页</router-link>
  <router-link to="/login">登录</router-link>
  <el-button>Default</el-button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'
export default defineComponent({
  name: 'app',
  components: {
    ElButton
  },
  setup() {
    return {}
  }
})
</script>
<style lang="less"></style>
