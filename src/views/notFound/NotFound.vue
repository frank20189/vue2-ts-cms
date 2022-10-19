<template>
  <div class="notfound">
    NOTFOUND
    <el-button
      @click="$router.push({ name: 'main' })"
      type="danger"
      size="large"
      >返回首页</el-button
    >
  </div>
</template>
<style scoped lang="less">
.notfound {
  height: 100vh;
  widows: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  font-weight: 700;
}
</style>
