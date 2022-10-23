<template>
  <div class="custom-table">
    <el-table :data="listData" border stripe style="width: 100%">
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :align="item.align"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { IPropListType } from '../types'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<IPropListType[]>,
      required: true
    }
  },
  setup() {
    // todo
    return {}
  }
})
</script>

<style lang="less" scoped>
.custom-table {
}
</style>
