<template>
  <div class="nav-header">
    <el-icon :size="25" class="header-icon" @click="handleFoldChange">
      <component :is="isFold ? 'Expand' : 'Fold'"></component>
    </el-icon>
    <div class="content">
      <CustomBreadcrumb :breadcrumb="breadcrumb" />
      <UserInfo />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserInfo from './UserInfo.vue'
// import NavBreadcrumb from './NavBreadcrumb.vue'
import CustomBreadcrumb from '@/base/breadcrumb'
import { useStore } from '@/store'
import { pathMapBreadcrumbs } from '@/utils/mapMenus'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NavHeader',
  emits: ['foldChange'],
  components: { UserInfo, CustomBreadcrumb },
  setup(props, { emit }) {
    const isFold = ref<boolean>(false)

    const handleFoldChange = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑导航数据
    const breadcrumb = computed(() => {
      const store = useStore()
      return pathMapBreadcrumbs(
        store.state.loginModule.userMenus,
        useRoute().fullPath
      )
    })

    return { handleFoldChange, isFold, breadcrumb }
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
