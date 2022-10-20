<template>
  <div class="nav-header">
    <el-icon :size="25" class="header-icon" @click="handleFoldChange">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <UserInfo />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserInfo from './UserInfo.vue'

export default defineComponent({
  name: 'NavHeader',
  emits: ['foldChange'],
  components: { UserInfo },
  setup(props, { emit }) {
    const isFold = ref<boolean>(false)

    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return { handleFoldChange, isFold }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .header-icon {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-left: 20px;
    .user-info {
      cursor: pointer;
    }
  }
}
</style>
