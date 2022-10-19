<template>
  <div class="nav-bar">
    <div class="logo">
      <img class="img" src="~@/assets/logo.png" alt="logo" />
      <span class="title" v-show="!isCollapse">Vue3+TSAdmin</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      unique-opened
      router
      background-color="#001529"
      active-text-color="#66b1ff"
      text-color="#999"
      :collapse="isCollapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.url">
            <template #title>
              <el-icon v-if="item.icon"
                ><component :is="item.icon"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.url">
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.url">
            <el-icon v-if="item.icon"
              ><component :is="item.icon"></component
            ></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { camelCase, upperFirst } from 'lodash'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const store = useStore()
    // const userMenus = computed(() => store.state.loginModule.userMenus)
    const userMenus = computed(() => {
      return store.state.loginModule.userMenus.map((item) => {
        return {
          ...item,
          icon: upperFirst(camelCase(item.icon.split('el-icon-')[1])) // 将icon的值转换成elementplus最新版本的动态组件的形式
        }
      })
    })
    return { userMenus, camelCase, upperFirst }
  }
})
</script>

<style lang="less" scoped>
.nav-bar {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
  }
  .el-menu {
    border-right: none !important;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    .el-menu-item {
      color: #999;
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
    .el-menu-item:hover {
      color: #fff;
      background-color: #1e507e !important;
    }
    .is-active {
      color: #66b1ff !important;
      background-color: #1e507e !important;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 100%;
      height: calc(100% - 48px);
    }
  }

  :deep(.el-sub-menu__title) {
    color: #ccc !important;
    background-color: #001529 !important;
  }
}
</style>
