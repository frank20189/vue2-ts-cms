<template>
  <div class="nav-header">
    <el-icon :size="25" class="header-icon" @click="handleFoldChange">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavHeader',
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)

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
  .header-icon {
    cursor: pointer;
  }
}
</style>
